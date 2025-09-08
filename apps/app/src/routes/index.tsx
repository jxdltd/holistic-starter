import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AppSidebar } from "../components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<SidebarTrigger />
				<div>Hello, World!</div>
			</main>
		</SidebarProvider>
	);
}
