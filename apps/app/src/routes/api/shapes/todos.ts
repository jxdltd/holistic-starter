import { auth } from "@repo/auth/server";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { env } from "../../../env";

export const ServerRoute = createServerFileRoute("/api/shapes/todos").methods({
	GET: async ({ request }) => {
		console.log("request");

		// returning 401 on server...
		// fetching forever on the client...
		const proxyUrl = new URL(request.url);

		const session = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session) {
			return new Response("Unauthorized", { status: 401 });
		}

		// Construct the origin URL.
		const originUrl = new URL(`/v1/shape`, `https://api.electric-sql.cloud`);
		proxyUrl.searchParams.forEach((value, key) => {
			originUrl.searchParams.set(key, value);
		});

		// Add the source params.
		originUrl.searchParams.set(`source_id`, env().ELECTRIC_SOURCE_ID);
		originUrl.searchParams.set(`secret`, env().ELECTRIC_SECRET);
		originUrl.searchParams.set(`table`, `todo`);
		originUrl.searchParams.set(`where`, `"user_id" = '${session.user.id}'`);

		// Proxy the authorised request on to the Electric Cloud.
		const response = await fetch(originUrl);

		// Fetch decompresses the body but doesn't remove the
		// content-encoding & content-length headers which would
		// break decoding in the browser.
		//
		// See https://github.com/whatwg/fetch/issues/1729
		const headers = new Headers(response.headers);
		headers.delete(`content-encoding`);
		headers.delete(`content-length`);

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	},
});
