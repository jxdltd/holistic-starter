import type { ReactNode } from "react";
import { useFormContext } from "./context";
import { Button } from "@repo/ui/components/button";

export function SubmitButton({ children }: { children: ReactNode }) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button className="w-full" type="submit" disabled={isSubmitting}>
					{children}
				</Button>
			)}
		</form.Subscribe>
	);
}
