import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { AppSidebar } from "../../components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import { getAuth } from "../../auth";
import { createTodo, getTodos } from "../../todos";
import { useState } from "react";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";

export const Route = createFileRoute("/examples/basic")({
  component: Home,
  loader: async () => {
    const auth = await getAuth();

    if (!auth) {
      throw redirect({ to: "/sign-in" });
    }

    return {
      user: auth.user,
      todos: await getTodos(),
    };
  },
});

function Home() {
  const { todos } = Route.useLoaderData();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    createTodo({ data: { title } }).then(() => {
      router.invalidate();
      setTitle("");
      setIsLoading(false);
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Basic Todos</h1>
        <p className="mb-4">
          A simple todo list built only with server functions.
        </p>
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </form>
      </main>
    </SidebarProvider>
  );
}
