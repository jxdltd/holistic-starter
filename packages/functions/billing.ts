import { polar } from "@repo/billing";
import { createServerFn } from "@tanstack/react-start";
import { authenticatedMiddleware } from "./auth";

export const getSubscriptions = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const subscriptions = await polar.subscriptions.list({
      externalCustomerId: context.user.id,
    });

    return subscriptions.result.items;
  });
