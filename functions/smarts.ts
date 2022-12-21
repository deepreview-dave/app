import { Validator } from "@cfworker/json-schema";

import { TextSmarts, PerformanceScore } from "../src/business/smarts";

interface Env {}

interface Params {}

interface Data {}

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

const validator = new Validator(RequestParamsSchema);

export async function onRequest(
  context: EventContext<Env, Params, Data>
): Promise<Response> {
  const url = new URL(context.request.url);
  const paramsRaw = {};
  for (const [key, value] of url.searchParams) {
    paramsRaw[key] = value;
  }

  const validation = validator.validate(paramsRaw);

  if (!validation.valid) {
    let errorStr = "";
    for (const errorInfo of validation.errors) {
      errorStr += `${errorInfo.error} `;
    }
    return new Response(`Invalid input: ${errorStr}`, { status: 400 });
  } else if (paramsRaw.name.trim() === "") {
    return new Response(`Invalid input: Empty name`, { status: 400 });
  } else if (paramsRaw.role?.trim() == "") {
    return new Response(`Invalid input: Empty role`, { status: 400 });
  } else if (paramsRaw.department?.trim() == "") {
    return new Response(`Invalid input: Empty department`, { status: 400 });
  }

  const params: RequestParams = paramsRaw as Params;

  const smarts = new TextSmarts(context.env.OPENAI_KEY);
  const response = await smarts.getSomeData(params);

  if (!response.success) {
    return new Response(`Server error: {response.error}`, { status: 500 });
  }

  return new Response(`${response.answer}`);
}
