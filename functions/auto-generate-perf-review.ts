import { Validator } from "@cfworker/json-schema";

import { AutoPerfReviewGenerator } from "../src/business/auto-perf-review-generator";
import {
  PerformanceScore,
  PersonDetails,
  ReviewTone,
  TimePeriod,
  WorkAttribute,
} from "../src/business/common";

interface Env {
  OPENAI_KEY: string;
}

interface RequestParams {
  name: string;
  performanceScore: PerformanceScore;
  attributes: string;
  role?: string;
  department?: string;
  timePeriod?: TimePeriod;
}

const REQUEST_PARAMS_SCHEMA = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1, maxLength: 100 },
    performanceScore: {
      enum: [
        PerformanceScore.BELOW_EXPECTATIONS,
        PerformanceScore.MEETS_EXPECTATIONS,
        PerformanceScore.ABOVE_EXPECTATIONS,
      ],
    },
    attributes: { type: "string", minLength: 1, maxLength: 10_000 },
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
  },
  required: ["name", "performanceScore"],
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

  if (params.name.trim() === "") {
    return new Response(`Invalid input: Empty name`, { status: 400 });
  } else if (params.role?.trim() === "") {
    return new Response(`Invalid input: Empty role`, { status: 400 });
  } else if (params.department?.trim() === "") {
    return new Response(`Invalid input: Empty department`, { status: 400 });
  } else if (params.timePeriod?.trim() === "") {
    return new Response(`Invalid input: Empty time period`, { status: 400 });
  }

  const smarts = new AutoPerfReviewGenerator(context.env.OPENAI_KEY);
  let attributes: WorkAttribute[] = [];
  try {
    attributes = JSON.parse(params.attributes) as WorkAttribute[];
  } catch {
    return new Response(`Invalid input: could not parse Attributes JSON`, {
      status: 400,
    });
  }
  const details = { ...params, attributes } as PersonDetails;

  try {
    const response = await smarts.getSomeData(details);
    return Response.json({ perfReview: response.perfReview });
  } catch (e) {
    return new Response(`Server error: ${e}`, { status: 500 });
  }
}
