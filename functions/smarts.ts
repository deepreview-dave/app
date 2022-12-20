interface Env {}

interface Params {}

interface Data {}

export function onRequest(
  context: EventContext<Env, Params, Data>
): Promise<Response> {
  return new Response("Hello, world!");
}
