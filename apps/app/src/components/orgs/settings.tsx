import { auth } from "@repo/auth/client";
import { useAppForm } from "@repo/forms";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { useRouter } from "@tanstack/react-router";
import z from "zod";

type Props = {
	orgId: string;
	defaultValues: {
		name: string;
	};
};

const formSchema = z.object({
	name: z.string().min(1),
});

export function OrgSettings({ orgId, defaultValues }: Props) {
	const router = useRouter();

	const form = useAppForm({
		defaultValues: {
			name: defaultValues.name,
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await auth.organization
				.update({
					data: {
						name: value.name,
					},
					organizationId: orgId,
				})
				.then(() => router.invalidate());
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Settings</CardTitle>
			</CardHeader>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
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
						<form.SubmitButton>Save</form.SubmitButton>
					</form.AppForm>
				</CardFooter>
			</form>
		</Card>
	);
}
