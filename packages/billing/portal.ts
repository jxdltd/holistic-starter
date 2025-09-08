import { CustomerPortal } from "@polar-sh/tanstack-start";
import { env } from "./env";
import { auth } from "@repo/auth/server";

export const handler = CustomerPortal({
	accessToken: env().POLAR_ACCESS_TOKEN,
	getCustomerId: async (request: Request) => {
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session) {
			throw new Error("Unauthorized");
		}

		return session.user.id;
	}, // Fuction to resolve a Polar Customer ID
	server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
});
