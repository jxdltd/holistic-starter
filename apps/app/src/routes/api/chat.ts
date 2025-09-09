import { defaultModel } from "@repo/ai";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export const ServerRoute = createServerFileRoute("/api/chat").methods({
  POST: async ({ request }) => {
    const { messages }: { messages: UIMessage[] } = await request.json();

    const result = streamText({
      model: defaultModel,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  },
});
