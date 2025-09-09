import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function generateJoke() {
	const { text } = await generateText({
		model: openai("gpt-4o-mini"),
		prompt: "Write a joke.",
	});

	return text;
}

export const defaultModel = openai("gpt-4o-mini");
