import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = () =>
  createEnv({
    extends: [],
    server: {
      DATABASE_URL: z.string(),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
  });
