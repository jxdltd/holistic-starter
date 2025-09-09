import { auth } from "@repo/auth/client";
import { useAppForm } from "@repo/forms";
import { getAuth } from "@repo/functions/auth";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { formOptions } from "@tanstack/react-form";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { z } from "zod";

const formOpts = formOptions({
	defaultValues: {
		name: "",
	},
});

const formSchema = z.object({
	name: z.string().min(1),
});

export const Route = createFileRoute("/_spotlight/orgs/new")({
	component: RouteComponent,
	loader: async () => {
		const session = await getAuth();
		if (!session) {
			throw redirect({ to: "/sign-in" });
		}
		return { ...session };
	},
});

function RouteComponent() {
	const { user } = Route.useLoaderData();
	const router = useRouter();

	const form = useAppForm({
		...formOpts,
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			auth.organization.create({
				name: value.name,
				slug: value.name.toLowerCase().replace(/ /g, "-"),
				userId: user.id,
			}).then(() => {
			router.navigate({ to: "/" });
			});
		},
	});

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>New Organization</CardTitle>
				<CardDescription>
					Create a new organization to add your team members and projects.
				</CardDescription>
			</CardHeader>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				method="POST"
				className="space-y-4"
			>
				<CardContent>
					<form.AppField
						name="name"
						children={(field) => <field.TextField label="Name" />}
					/>
				</CardContent>
				<CardFooter>
					<form.AppForm>
						<form.SubmitButton>Create</form.SubmitButton>
					</form.AppForm>
				</CardFooter>
			</form>
		</Card>
	);
}
