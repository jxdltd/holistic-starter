import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = () =>
  createEnv({
    server: {
      ELECTRIC_SOURCE_ID: z.string(),
      ELECTRIC_SECRET: z.string(),
    },
    runtimeEnv: {
      ELECTRIC_SOURCE_ID: process.env.ELECTRIC_SOURCE_ID,
      ELECTRIC_SECRET: process.env.ELECTRIC_SECRET,
    },
  });
