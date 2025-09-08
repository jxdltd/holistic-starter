import { Polar } from "@polar-sh/sdk";
import { env } from "./env";

export const polar = new Polar({
	accessToken: env().POLAR_ACCESS_TOKEN,

	// Use 'sandbox' if you're using the Polar Sandbox environment
	// Remember that access tokens, products, etc. are completely separated between environments.
	// Access tokens obtained in Production are for instance not usable in the Sandbox environment.
	server: "sandbox",
});
