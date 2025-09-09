import { todoCollection } from "@repo/collections/todos";
import { getAuth } from "@repo/functions/auth";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Input } from "@repo/ui/components/input";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_sidebar/examples/sync-db")({
	component: Home,
	loader: async () => {
		// todo preload
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

	const { data: todos } = useLiveQuery((q) =>
		q
			.from({ todo: todoCollection })
			.where(({ todo }) => eq(todo.completed, false))
			.orderBy(({ todo }) => todo.createdAt, "desc"),
	);

	const [title, setTitle] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		todoCollection.insert({
			id: crypto.randomUUID(),
			createdAt: new Date(),
			completed: false,
			userId: user.id,
			title,
		});
		setTitle("");
	};

	return (
		<>
			<h1 className="text-2xl font-bold">Sync with TanStack DB</h1>
			<p className="mb-4">A simple todo list built with TanStack DB.</p>
			<div className="mb-4">
				{todos.map((todo) => (
					<div key={todo.id} className="flex items-center gap-2">
						<Checkbox />
						{todo.title}
					</div>
				))}
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex gap-2 p-3 bg-muted w-full rounded-lg"
			>
				<Input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="bg-white"
				/>
				<Button type="submit">Add</Button>
			</form>
		</>
	);
}
