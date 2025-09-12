import { env as config } from "@repo/config/env";
import { env as mail } from "@repo/mail/env";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = () =>
	createEnv({
		extends: [config(), mail()],
		server: {
			BETTER_AUTH_SECRET: z.string(),
		},
		runtimeEnv: {
			BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		},
	});
