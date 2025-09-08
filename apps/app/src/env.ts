import { env as config } from "@repo/config/env";
import { createEnv } from "@t3-oss/env-core";

export const env = () =>
	createEnv({
		extends: [config()],
		clientPrefix: "VITE_",
		server: {},
		client: {},
		runtimeEnv: {},
	});
