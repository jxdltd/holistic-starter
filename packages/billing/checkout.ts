import { Checkout } from "@polar-sh/tanstack-start";
import { env } from "./env";

export const handler = Checkout({
	accessToken: env().POLAR_ACCESS_TOKEN,
	successUrl: "/",
	server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
});
