import { getAuth } from "@repo/functions/auth";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_sidebar/")({
	component: Home,
	loader: async () => {
		const auth = await getAuth();

		if (!auth) {
			throw redirect({ to: "/sign-in" });
		}

		return {
			user: auth.user,
		};
	},
});

function Home() {
	const { user } = Route.useLoaderData();

	return (
		<>
			<div>Hello, {user.email}!</div>
			<Button
				onClick={() => {
					throw new Error("Test error");
				}}
			>
				Throw
			</Button>
		</>
	);
}
