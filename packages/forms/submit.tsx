import { Button } from "@repo/ui/components/button";
import type { ReactNode } from "react";
import { useFormContext } from "./context";

export function SubmitButton({ children }: { children: ReactNode }) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button className="w-full" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "..." : children}
				</Button>
			)}
		</form.Subscribe>
	);
}
