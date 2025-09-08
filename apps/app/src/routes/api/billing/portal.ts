import { createServerFileRoute } from "@tanstack/react-start/server";
import { auth } from "@repo/auth/server";
import { polar } from "@repo/billing";

export const ServerRoute = createServerFileRoute("/api/billing/portal").methods(
	{
		GET: async ({ request }) => {
			const session = await auth.api.getSession({
				headers: request.headers,
			});

			if (!session) {
				return new Response("Unauthorized", { status: 401 });
			}

			const customerSession = await polar.customerSessions.create({
				externalCustomerId: session.user.id,
			});

			return new Response(customerSession.customerPortalUrl, {
				status: 302,
				headers: {
					Location: customerSession.customerPortalUrl,
				},
			});
		},
	},
);
