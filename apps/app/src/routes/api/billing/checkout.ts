import { auth } from "@repo/auth/server";
import { polar } from "@repo/billing";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { z } from "zod";

const paramsSchema = z.object({
  product: z.string(),
});

export const ServerRoute = createServerFileRoute(
  "/api/billing/checkout"
).methods({
  GET: async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(request.url);

    const params = paramsSchema.parse({
      product: url.searchParams.get("product"),
    });

    const checkout = await polar.checkouts.create({
      products: [params.product],
      externalCustomerId: session.user.id,
    });

    return new Response(checkout.url, {
      status: 302,
      headers: {
        Location: checkout.url,
      },
    });
  },
});
