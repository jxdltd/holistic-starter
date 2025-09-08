import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = () =>
	createEnv({
		server: {
			// APP_URL: z.url(),
		},
		runtimeEnv: {
			// APP_URL: process.env.APP_URL,
		},
	});
