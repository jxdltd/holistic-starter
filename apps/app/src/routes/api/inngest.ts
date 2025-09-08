import { handler } from "@repo/jobs";
import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/inngest").methods({
	GET: handler,
	POST: handler,
	PUT: handler,
});
