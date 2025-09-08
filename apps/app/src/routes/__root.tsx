/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
	Outlet,
	createRootRoute,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import css from "../styles.css?url";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../utils/query-client";
import { wrapCreateRootRouteWithSentry } from "@sentry/tanstackstart-react";

export const Route = wrapCreateRootRouteWithSentry(
	createRootRoute({
		head: () => ({
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					title: "Holistic Starter",
				},
			],
			links: [
				{
					rel: "stylesheet",
					href: css,
				},
			],
		}),
		component: RootComponent,
	}),
);

function RootComponent() {
	return (
		<RootDocument>
			<QueryClientProvider client={queryClient}>
				<Outlet />
			</QueryClientProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
