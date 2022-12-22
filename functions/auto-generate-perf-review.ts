import { Validator } from "@cfworker/json-schema";

import { AutoPerfReviewGenerator } from "../src/business/auto-perf-review-generator";
import { PerformanceScore, WorkAttribute } from "../src/business/common";

interface Env {
  OPENAI_KEY: string;
}

interface RequestParams {
  name: string;
  performanceScore: PerformanceScore;
  attributes: string;
  role?: string;
  department?: string;
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
    attributes: { type: "string", },
    role: { type: "string", minLength: 1, maxLength: 100 },
    department: { type: "string", minLength: 1, maxLength: 100 },
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
  }

  const smarts = new AutoPerfReviewGenerator(context.env.OPENAI_KEY);
  const attributes = JSON.parse(params.attributes) as WorkAttribute[];

  try {
    const response = await smarts.getSomeData(params, attributes);
    return new Response(response.perfReview);
  } catch (e) {
    return new Response(`Server error: ${e}`, { status: 500 });
  }
}
