import { Validator } from "@cfworker/json-schema";

import { AutoPerfReviewGenerator } from "../src/business/auto-perf-review-generator";
import {
  PerformanceScore,
  PersonDetails,
  ReviewLanguage,
  ReviewTone,
  TimePeriod,
  WorkAttribute,
  Pronouns,
  Relationship,
  PerformanceReviewType,
  ReviewDetails,
} from "../src/business/common";

interface Env {
  OPENAI_KEY: string;
}

interface RequestParams {
  type: PerformanceReviewType;
  name: string;
  performanceScore: PerformanceScore;
  pronoun: Pronouns;
  relationship: Relationship;
  details: string;
  role?: string;
  department?: string;
  timePeriod?: TimePeriod;
  reviewTone?: ReviewTone;
}

const REQUEST_PARAMS_SCHEMA = {
  type: "object",
  properties: {
    type: {
      enum: [
        PerformanceReviewType.ATTRIBUTE,
        PerformanceReviewType.FREEFORM,
        PerformanceReviewType.START_STOP_CONTINUE,
        PerformanceReviewType.STRENGTH_IMPROVEMENT,
      ],
    },
    name: { type: "string", minLength: 1, maxLength: 100 },
    performanceScore: {
      enum: [
        PerformanceScore.BELOW_EXPECTATIONS,
        PerformanceScore.MEETS_EXPECTATIONS,
        PerformanceScore.ABOVE_EXPECTATIONS,
      ],
    },
    pronoun: {
      enum: [Pronouns.NEUTRAL, Pronouns.HE, Pronouns.HER],
    },
    relationship: {
      enum: [
        Relationship.COLLEAGUE,
        Relationship.MANAGER,
        Relationship.MYSELF,
        Relationship.REPORT,
      ],
    },
    details: { type: "string", minLength: 1, maxLength: 10_000 },
    role: { type: "string", minLength: 1, maxLength: 100 },
    department: { type: "string", minLength: 1, maxLength: 100 },
    timePeriod: {
      enum: [
        TimePeriod.LAST_MONTH,
        TimePeriod.LAST_3_MONTHS,
        TimePeriod.LAST_6_MONTHS,
        TimePeriod.LAST_12_MONTHS,
      ],
    },
    reviewTone: {
      enum: [ReviewTone.NEUTRAL, ReviewTone.FRIENDLY, ReviewTone.CRITICAL],
    },
    reviewLanguage: {
      enum: [
        ReviewLanguage.ENGLISH,
        ReviewLanguage.SPANISH,
        ReviewLanguage.FRENCH,
        ReviewLanguage.GERMAN,
        ReviewLanguage.ITALIAN,
        ReviewLanguage.ROMANIAN,
      ],
    },
  },
  required: ["name", "performanceScore", "type"],
  additionalProperties: false,
};

const REQUEST_VALIDATOR = new Validator(REQUEST_PARAMS_SCHEMA);

export async function onRequest(
  context: EventContext<Env, string, null>
): Promise<Response> {
  const url = new URL(context.request.url);
  const paramsRaw = {};
  for (const [key, value] of url.searchParams) {
    paramsRaw[key] = value;
  }

  const validation = REQUEST_VALIDATOR.validate(paramsRaw);

  if (!validation.valid) {
    let errorStr = "";
    for (const errorInfo of validation.errors) {
      errorStr += `${errorInfo.error} `;
    }
    return new Response(`Invalid input: ${errorStr}`, { status: 400 });
  }

  const params: RequestParams = paramsRaw as RequestParams;

  if (params.type.trim() === "") {
    return new Response(`Invalid input: Empty review type`, { status: 400 });
  } else if (params.name.trim() === "") {
    return new Response(`Invalid input: Empty name`, { status: 400 });
  } else if (params.pronoun.trim() === "") {
    return new Response(`Invalid input: Empty pronoun`, { status: 400 });
  } else if (params.relationship.trim() === "") {
    return new Response(`Invalid input: Empty relationship`, { status: 400 });
  } else if (params.role?.trim() === "") {
    return new Response(`Invalid input: Empty role`, { status: 400 });
  } else if (params.department?.trim() === "") {
    return new Response(`Invalid input: Empty department`, { status: 400 });
  } else if (params.timePeriod?.trim() === "") {
    return new Response(`Invalid input: Empty time period`, { status: 400 });
  }

  const smarts = new AutoPerfReviewGenerator(context.env.OPENAI_KEY);
  let details: ReviewDetails = {
    freeform: "",
    attributes: [],
  };
  try {
    details = JSON.parse(params.details) as ReviewDetails;
  } catch {
    return new Response(`Invalid input: could not parse Review Details JSON`, {
      status: 400,
    });
  }
  const data = { ...params, details } as PersonDetails;

  try {
    const response = await smarts.getSomeData(data);
    return Response.json({ perfReview: response.perfReview });
  } catch (e) {
    return new Response(`Server error: ${e}`, { status: 500 });
  }
}
