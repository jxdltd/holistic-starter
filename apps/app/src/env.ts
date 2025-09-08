import { env as config } from "@repo/config/env";
import { env as electric } from "@repo/electric/env";
import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = () =>
	createEnv({
		extends: [config(), electric()],
		clientPrefix: "VITE_",
		server: {},
		client: {
			VITE_SENTRY_DSN: z.string(),
		},
		runtimeEnv: {
			VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
		},
	});
