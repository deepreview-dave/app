import { Validator } from "@cfworker/json-schema";

import { TextSmarts, PerformanceScore } from "../src/domain/smarts";

interface Env {}

interface Params {}

interface Data {}

interface RequestParams {
  name: string;
  performanceScore: PerformanceScore;
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
  }

  const params: RequestParams = paramsRaw as Params;

  const smarts = new TextSmarts(context.env.REACT_APP_OPENAI_KEY);
  const response = await smarts.getSomeData({
    name: params.name,
    performanceScore: params.performanceScore,
  });

  return new Response(`Hello, world! ${response}`);
}
