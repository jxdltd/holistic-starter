import { env as ai } from "@repo/ai/env";
import { env as auth } from "@repo/auth/env";
import { env as config } from "@repo/config/env";
import { env as electric } from "@repo/electric/env";
import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = () =>
	createEnv({
		extends: [config(), electric(), ai(), auth()],
		clientPrefix: "VITE_",
		server: {},
		client: {
			VITE_SENTRY_DSN: z.string(),
		},
		runtimeEnv: {
			VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
		},
	});
