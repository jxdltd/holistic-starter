import { createServerFileRoute } from "@tanstack/react-start/server";
import { handler } from "@repo/billing/portal";

export const ServerRoute = createServerFileRoute("/api/billing/portal").methods({
  GET: handler,
});
