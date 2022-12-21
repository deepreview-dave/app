import { Validator } from "@cfworker/json-schema";

import { AutoPerfReviewGenerator } from "../src/business/auto-perf-review-generator";
import { PerformanceScore } from "../src/business/common";

interface Env {
  OPENAI_KEY: string;
}

interface RequestParams {
  name: string;
  performanceScore: PerformanceScore;
  role?: string;
  department?: string;
}

const RequestParamsSchema = {
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
    role: { type: "string", minLength: 1, maxLength: 100 },
    department: { type: "string", minLength: 1, maxLength: 100 },
  },
  required: ["name", "performanceScore"],
  additionalProperties: false,
};

const REQUEST_VALIDATOR = new Validator(RequestParamsSchema);

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
  } else if (params.role?.trim() == "") {
    return new Response(`Invalid input: Empty role`, { status: 400 });
  } else if (params.department?.trim() == "") {
    return new Response(`Invalid input: Empty department`, { status: 400 });
  }

  const smarts = new AutoPerfReviewGenerator(context.env.OPENAI_KEY);

  try {
    const response = await smarts.getSomeData(params);
    return new Response(response.perfReview);
  } catch (e) {
    return new Response(`Server error: ${e}`, { status: 500 });
  }
}
