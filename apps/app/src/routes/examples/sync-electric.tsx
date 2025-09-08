import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppSidebar } from "../../components/sidebar";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { getAuth } from "../../auth";
import { useState } from "react";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { todosElectricCollection } from "@repo/collections/todos-electric";

export const Route = createFileRoute("/examples/sync-electric")({
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
      .from({ todo: todosElectricCollection })
      .where(({ todo }) => eq(todo.completed, false))
      .orderBy(({ todo }) => todo.createdAt, "desc")
  );

  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todosElectricCollection.insert({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      completed: false,
      userId: user.id,
      title,
    });
    setTitle("");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Sync with Electric</h1>
        <p className="mb-4">A simple todo list built with Electric SQL.</p>
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
      </main>
    </SidebarProvider>
  );
}
