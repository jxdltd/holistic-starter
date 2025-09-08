import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { AppSidebar } from "../components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import { getAuth } from "../auth";

export const Route = createFileRoute("/todo")({
  component: Home,
  loader: async () => {
    const auth = await getAuth();

    if (!auth) {
      throw redirect({ to: "/sign-in" });
    }

    return {
      user: auth.user,
    };
  },
});

function Home() {
  const { user } = Route.useLoaderData();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div>Hello, {user.email}!</div>
      </main>
    </SidebarProvider>
  );
}
