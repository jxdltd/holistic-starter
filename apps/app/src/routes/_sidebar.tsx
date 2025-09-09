import { Button } from "@repo/ui/components/button";
import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "../components/sidebar";

export const Route = createFileRoute("/_sidebar")({
  component: RouteComponent,
});

function RouteComponent() {
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
