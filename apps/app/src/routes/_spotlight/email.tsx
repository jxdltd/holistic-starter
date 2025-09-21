import { IconMail, IconMailFilled } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_spotlight/email")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<IconMailFilled className="size-10 text-primary" />
			<h1 className="text-2xl font-bold">Check your email</h1>
			<p className="text-sm text-muted-foreground">
				We sent a magic link to your email. Click the link to sign in.
			</p>
		</>
	);
}
