import { auth } from "@repo/auth/client";
import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarGroup,
	SidebarFooter,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@repo/ui/components/sidebar";
import { Link } from "@tanstack/react-router";

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Pages</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to="/">Home</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Examples</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to="/examples/basic">Basic</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to="/examples/sync-db">Sync (TanStack DB)</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to="/examples/sync-electric">Sync (Electric)</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to="/examples/billing">Billing</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="/api/billing/portal">Billing</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton onClick={() => auth.signOut()}>
							Sign Out
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
