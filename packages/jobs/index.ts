import { InngestCommHandler, type ServeHandlerOptions } from "inngest";
import { inngest } from "./client";
import { helloWorld } from "./demo";

const serve = (options: ServeHandlerOptions) => {
  const handler = new InngestCommHandler({
    frameworkName: "TanStack Start",
    fetch: fetch.bind(globalThis),
    ...options,
    handler: ({ request }: { request: Request }) => {
      return {
        body: () => request.json(),
        headers: (key) => request.headers.get(key),
        method: () => request.method,
        url: () =>
          new URL(request.url, `https://${request.headers.get("host") || ""}`),
        transformResponse: ({ body, status, headers }) => {
          return new Response(body, { status, headers });
        },
      };
    },
  });

  return handler.createHandler();
};

export const handler = serve({
  client: inngest,
  functions: [helloWorld],
});
