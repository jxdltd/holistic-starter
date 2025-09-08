import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = () =>
  createEnv({
    extends: [],
    server: {
      BETTER_AUTH_SECRET: z.string(),
    },
    runtimeEnv: {
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    },
  });
