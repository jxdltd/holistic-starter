import { getAuth } from "@repo/functions/auth";
import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import * as Sentry from "@sentry/tanstackstart-react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppSidebar } from "../components/sidebar";

export const Route = createFileRoute("/_sidebar")({
  component: RouteComponent,
  loader: async () => {
    const auth = await getAuth();

    Sentry.setUser(
      auth
        ? {
            id: auth.user.id,
            email: auth.user.email,
          }
        : null
    );

    return {
      auth,
    };
  },
});

function RouteComponent() {
  const { auth } = Route.useLoaderData();

  useEffect(() => {
    Sentry.setUser(
      auth
        ? {
            id: auth.user.id,
            email: auth.user.email,
          }
        : null
    );
  }, [auth]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
