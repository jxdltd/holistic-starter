import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
	{ id: "hello-world" },
	{ event: "todo/created" },
	async ({ event, step }) => {
		await step.sleep("wait-a-moment", "1s");
		return { message: `Hello ${event.data.todo.id}!` };
	},
);
