import { auth } from "@repo/auth/client";
import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_spotlight/invite/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const invitationQuery = useQuery({
		queryKey: ["invitation", id],
		queryFn: async () => {
			const inivtation = await auth.organization.getInvitation({
				query: {
					id,
				},
			});

			return inivtation.data;
		},
	});
	const router = useRouter();

	if (!invitationQuery.data) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Join {invitationQuery.data.organizationName}</CardTitle>
			</CardHeader>
			<CardContent>
				<Button
					onClick={async () => {
						if (!invitationQuery.data) return;

						await auth.organization.acceptInvitation({
							invitationId: invitationQuery.data.id,
						});

						router.navigate({
							to: "/orgs/$slug",
							params: { slug: invitationQuery.data.organizationSlug },
						});
					}}
				>
					Accept Invitation
				</Button>
			</CardContent>
		</Card>
	);
}
