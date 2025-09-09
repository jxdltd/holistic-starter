import { auth } from "@repo/auth/client";
import { useAppForm } from "@repo/forms";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { Logo } from "../components/logo";

export const Route = createFileRoute("/sign-in")({
	component: RouteComponent,
	head: () => ({
		meta: [{ title: "Sign In" }],
	}),
});

const formSchema = z.object({
	email: z.email(),
});

function RouteComponent() {
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
			<form
				className="flex flex-col items-center justify-center gap-4 bg-card p-4 rounded-md w-full max-w-md border shadow-xs"
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
					<form.SubmitButton>Sign In</form.SubmitButton>
				</form.AppForm>
			</form>
		</div>
	);
}
