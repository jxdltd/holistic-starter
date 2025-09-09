import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/utils";
import type { ReactNode } from "react";
import { useFormContext } from "./context";

type Props = {
	className?: string;
	children: ReactNode;
};

export function SubmitButton({ children, className }: Props) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button
					className={cn("w-full", className)}
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? "..." : children}
				</Button>
			)}
		</form.Subscribe>
	);
}
