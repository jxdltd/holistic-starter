import { auth } from "@repo/auth/client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@repo/ui/components/sidebar";
import {
	IconBuilding,
	IconPlus,
	IconSelector,
	IconUser,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export function TeamSwitcher() {
	const { isMobile } = useSidebar();
	const organisations = auth.useListOrganizations();
	const activeOrganisation = auth.useActiveOrganization();

	if (organisations.isPending || activeOrganisation.isPending) {
		return null;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<IconUser className="size-4" />
								{/* <activeTeam.logo className="size-4" /> */}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{activeOrganisation.data?.name ?? "Personal"}
								</span>
							</div>
							<IconSelector className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Teams
						</DropdownMenuLabel>
						{organisations.data?.map((team, index) => (
							<DropdownMenuItem key={team.name} className="gap-2 p-2" asChild>
								<Link to="/orgs/$slug" params={{ slug: team.slug }}>
									<div className="flex size-6 items-center justify-center rounded-md border">
										<IconBuilding className="size-3.5 shrink-0" />
										{/* <team.logo className="size-3.5 shrink-0" /> */}
									</div>
									{team.name}
									<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
								</Link>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2" asChild>
							<Link to="/orgs/new">
								<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
									<IconPlus className="size-4" />
								</div>
								<div className="text-muted-foreground font-medium">
									Add team
								</div>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
