import { useAppForm } from "@repo/forms";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(1),
});

export const Route = createFileRoute("/_spotlight/orgs/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useAppForm({
		defaultValues: {
			name: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
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
				className="space-y-4"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
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
