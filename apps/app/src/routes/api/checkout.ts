import { createServerFileRoute } from "@tanstack/react-start/server";
import { handler } from "@repo/billing/checkout";

export const ServerRoute = createServerFileRoute("/api/checkout").methods({
	GET: handler,
});
