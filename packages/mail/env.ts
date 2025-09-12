import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = () =>
	createEnv({
		extends: [],
		server: {
			RESEND_API_KEY: z.string(),
			RESEND_FROM_EMAIL: z.string(),
		},
		runtimeEnv: {
			RESEND_API_KEY: process.env.RESEND_API_KEY,
			RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
		},
	});
