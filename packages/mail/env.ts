import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = () =>
  createEnv({
    extends: [],
    server: {
      RESEND_API_KEY: z.string(),
    },
    runtimeEnv: {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
    },
  });
