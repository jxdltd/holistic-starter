import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useFieldContext } from "./context";

export function TextField({ label }: { label: string }) {
	const field = useFieldContext<string>();

	return (
		<div className="flex flex-col gap-1 w-full">
			<Label htmlFor={field.name} className="text-sm font-medium">
				{label}
			</Label>
			<Input
				id={field.name}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			{field.state.meta.errors && (
				<p className="text-sm text-destructive font-medium">
					{field.state.meta.errors.map((error) => error.message).join(", ")}
				</p>
			)}
		</div>
	);
}
