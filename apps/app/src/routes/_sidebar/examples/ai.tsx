import { useChat } from "@ai-sdk/react";
import { generateJoke } from "@repo/ai";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  Message,
  MessageContent,
} from "@repo/ui/components/ai-elements/message";
import { Response } from "@repo/ui/components/ai-elements/response";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@repo/ui/components/ai-elements/prompt-input";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@repo/ui/components/ai-elements/conversation";

const generateJokeFn = createServerFn().handler(async () => {
  return await generateJoke();
});

export const Route = createFileRoute("/_sidebar/examples/ai")({
  component: RouteComponent,
});

function RouteComponent() {
  const [text, setText] = useState<string>("");

  const { messages, status, sendMessage } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage({
      text: message.text || "Sent with attachments",
      files: message.files,
    });
    setText("");
  };

  return (
    <div className="w-full p-6">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <Response key={`${message.id}-${i}`}>
                            {part.text}
                          </Response>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4"
          globalDrop
          multiple
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </PromptInputBody>
          <PromptInputToolbar>
            <PromptInputTools>
              {/* <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu> */}
            </PromptInputTools>
            <PromptInputSubmit disabled={!text && !status} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}
