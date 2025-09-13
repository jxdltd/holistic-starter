import { auth } from "@repo/auth/client";
import { useAppForm } from "@repo/forms";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { Logo } from "../components/logo";
import { env } from "../env";

const enabledProviders = createServerFn({ method: "GET" }).handler(() => {
	return {
		github: !!env().GITHUB_CLIENT_ID && !!env().GITHUB_CLIENT_SECRET,
		google: !!env().GOOGLE_CLIENT_ID && !!env().GOOGLE_CLIENT_SECRET,
	};
});

export const Route = createFileRoute("/sign-in")({
	component: RouteComponent,
	head: () => ({
		meta: [{ title: "Sign In" }],
	}),
	loader: async () => {
		return {
			enabledProviders: await enabledProviders(),
		};
	},
});

const formSchema = z.object({
	email: z.email(),
});

function RouteComponent() {
	const lastMethod = auth.getLastUsedLoginMethod();

	const { enabledProviders } = Route.useLoaderData();

	const form = useAppForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			auth.signIn.magicLink({ email: value.email });
		},
	});

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-accent gap-5">
			<Logo />
			<div className="flex flex-col items-center justify-center gap-4 bg-card p-4 rounded-md w-full max-w-md border shadow-xs">
				<form
					className="flex flex-col items-center justify-center gap-4 w-full"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<form.AppField
						name="email"
						children={(field) => <field.TextField label="Email" />}
					/>
					<form.AppForm>
						<form.SubmitButton>
							<span>Sign In</span>
							{lastMethod === "email" && <Badge>Last used</Badge>}
						</form.SubmitButton>
					</form.AppForm>
				</form>
				<Separator />
				{enabledProviders.github && (
					<Button
						className="w-full"
						variant="outline"
						onClick={() =>
							auth.signIn.social({ provider: "github", callbackURL: "/" })
						}
					>
						<IconBrandGithub />
						Sign In with Github
						{lastMethod === "github" && <Badge>Last used</Badge>}
					</Button>
				)}
				{enabledProviders.google && (
					<Button
						className="w-full"
						variant="outline"
						onClick={() =>
							auth.signIn.social({ provider: "google", callbackURL: "/" })
						}
					>
						<IconBrandGoogleFilled />
						Sign In with Google
						{lastMethod === "google" && <Badge>Last used</Badge>}
					</Button>
				)}
			</div>
		</div>
	);
}
