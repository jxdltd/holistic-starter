import { auth } from "@repo/auth/client";
import { useAppForm } from "@repo/forms";
import { Input } from "@repo/ui/components/input";
import { useRouter } from "@tanstack/react-router";
import z from "zod";

const formSchema = z.object({
	email: z.email(),
});

type Props = {
	orgId: string;
};

export function InviteForm({ orgId }: Props) {
	const router = useRouter();

	const form = useAppForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			const { error } = await auth.organization.inviteMember({
				email: value.email,
				role: "member",
				organizationId: orgId,
			});

			if (error) {
				throw error;
			}

			form.reset();
			router.invalidate();
		},
	});

	return (
		<form
			className="flex gap-2 w-full"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field
				name="email"
				children={(field) => (
					<Input
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						placeholder="bob@example.com"
						className="w-full flex-1"
					/>
				)}
			/>
			<form.AppForm>
				<form.SubmitButton className="w-min">Invite</form.SubmitButton>
			</form.AppForm>
		</form>
	);
}
