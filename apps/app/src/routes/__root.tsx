/// <reference types="vite/client" />

import { ThemeProvider, useTheme } from "@repo/theme/context";
import { getThemeServerFn } from "@repo/theme/functions";
import { wrapCreateRootRouteWithSentry } from "@sentry/tanstackstart-react";
import { QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import css from "../styles.css?url";
import { queryClient } from "../utils/query-client";

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
		loader: async () => {
			return {
				theme: await getThemeServerFn(),
			};
		},
	}),
);

function RootComponent() {
	const { theme } = Route.useLoaderData();
	return (
		<ThemeProvider theme={theme}>
			<RootDocument>
				<QueryClientProvider client={queryClient}>
					<Outlet />
				</QueryClientProvider>
			</RootDocument>
		</ThemeProvider>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	const { theme } = useTheme();

	return (
		<html lang="en" className={theme}>
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
