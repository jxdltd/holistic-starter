import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppSidebar } from "../components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import { getAuth } from "@repo/functions/auth";
import { Button } from "@repo/ui/components/button";

export const Route = createFileRoute("/")({
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
        <Button
          onClick={() => {
            throw new Error("Test error");
          }}
        >
          Throw
        </Button>
      </main>
    </SidebarProvider>
  );
}
