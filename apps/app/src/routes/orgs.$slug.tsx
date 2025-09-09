import { auth } from "@repo/auth/server";
import { authenticatedMiddleware } from "@repo/functions/auth";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import z from "zod";
import { AppSidebar } from "../components/sidebar";

const getOrgSchema = z.object({
	slug: z.string(),
});

const getOrg = createServerFn()
	.validator(getOrgSchema)
	.middleware([authenticatedMiddleware])
	.handler(async ({ data }) => {
		const req = getWebRequest();
		return auth.api.getFullOrganization({
			query: {
				organizationSlug: data.slug, // todo validate membership?
			},
			headers: req?.headers,
		});
	});

export const Route = createFileRoute("/orgs/$slug")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const org = await getOrg({ data: params });

		if (!org) {
			throw notFound();
		}

		return {
			org,
		};
	},
});

function RouteComponent() {
	const { org } = Route.useLoaderData();

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full p-4">
				<div>{org.name}</div>
			</main>
		</SidebarProvider>
	);
}
