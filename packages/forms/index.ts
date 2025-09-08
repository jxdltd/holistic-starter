import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import { TextField } from "./text-field";
import { SubmitButton } from "./submit";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		// NumberField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
