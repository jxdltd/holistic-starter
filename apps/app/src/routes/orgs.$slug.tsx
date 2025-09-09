import { auth } from "@repo/auth/server";
import { authenticatedMiddleware } from "@repo/functions/auth";
import { Badge } from "@repo/ui/components/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import z from "zod";
import { OrgSettings } from "../components/orgs/settings";
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
			<AppSidebar activeOrgId={org.id} />
			<main className="w-full p-4 space-y-4">
				<h1 className="text-2xl font-bold">{org.name}</h1>
				<OrgSettings orgId={org.id} defaultValues={{ name: org.name }} />
				<Card>
					<CardHeader>
						<CardTitle>Members</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-2">
							{org.members.map((member) => (
								<div key={member.id} className="flex items-center gap-2">
									<span>{member.user.email}</span>
									<Badge className="capitalize">{member.role}</Badge>
								</div>
							))}
						</div>
						<div className="flex flex-col gap-2">
							{org.invitations.map((invite) => (
								<div key={invite.id} className="flex items-center gap-2">
									<span>{invite.email}</span>
									<Badge className="capitalize">{invite.role}</Badge>
									<Badge>Pending</Badge>
								</div>
							))}
						</div>
					</CardContent>
					<CardFooter>Todo</CardFooter>
				</Card>
			</main>
		</SidebarProvider>
	);
}
