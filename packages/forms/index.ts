import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./context";
import { SubmitButton } from "./submit";
import { TextField } from "./text-field";

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
