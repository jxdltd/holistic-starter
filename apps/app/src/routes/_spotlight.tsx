import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_spotlight")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-screen flex flex-col gap-5 items-center justify-center">
			<Outlet />
		</div>
	);
}
