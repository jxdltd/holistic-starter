import { env as config } from "@repo/config/env";
import { env as electric } from "@repo/electric/env";
import { createEnv } from "@t3-oss/env-core";

export const env = () =>
  createEnv({
    extends: [config(), electric()],
    clientPrefix: "VITE_",
    server: {},
    client: {},
    runtimeEnv: {},
  });
