import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = () =>
  createEnv({
    server: {
      POLAR_ACCESS_TOKEN: z.string(),
    },
    runtimeEnv: {
      POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    },
  });
