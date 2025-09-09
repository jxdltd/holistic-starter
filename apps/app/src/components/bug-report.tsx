import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import * as Sentry from "@sentry/react";
import { IconBug } from "@tabler/icons-react";

async function openFeedbackForm() {
  const feedback = Sentry.getFeedback();
  const form = await feedback?.createForm();

  if (!form) {
    return;
  }

  form.appendToDom();
  form.open();
}

export function BugReport() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={() => openFeedbackForm()}>
        <IconBug />
        Report a bug
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
