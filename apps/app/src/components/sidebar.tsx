import { auth } from "@repo/auth/client";
import { ThemeSwitcher } from "@repo/theme/react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { IconCreditCard, IconHome, IconLogout } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { BugReport } from "./bug-report";
import { TeamSwitcher } from "./team-switcher";

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<TeamSwitcher teams={[]} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Pages</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to="/">
										<IconHome />
										Home
									</Link>
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
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to="/examples/subscribed">Subscribed</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link to="/examples/ai">AI</Link>
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
							<a href="/api/billing/portal">
								<IconCreditCard />
								Billing
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<BugReport />
					<SidebarMenuItem>
						<SidebarMenuButton onClick={() => auth.signOut()}>
							<IconLogout />
							Sign Out
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<ThemeSwitcher />
			</SidebarFooter>
		</Sidebar>
	);
}
