import { Validator } from "@cfworker/json-schema";
import { EmailSubscribeService } from "../src/business/email-subscribe-service";

interface Env {
  MAILCHIMP_U: string;
  MAILCHIMP_ID: string;
}

interface RequestParams {
  email: string;
}

const REQUEST_PARAMS_SCHEMA = {
  type: "object",
  properties: {
    email: { type: "string", minLength: 1, maxLength: 100 },
  },
  required: ["email"],
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

  const emailSubscribeService = new EmailSubscribeService(
    context.env.MAILCHIMP_U,
    context.env.MAILCHIMP_ID
  );

  try {
    const result = await emailSubscribeService.subscribe(params.email);

    if (!result) {
      return new Response("Failure", { status: 500 });
    }

    console.log(result);
    return new Response("Success");
  } catch (e) {
    console.log(e);
    return new Response(`Server error: ${e}`, { status: 500 });
  }
}
