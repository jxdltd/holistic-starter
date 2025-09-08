import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { AppSidebar } from "../components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import { getAuth } from "../auth";
import { createTodo, getTodos } from "../todos";
import { useState } from "react";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";

export const Route = createFileRoute("/todo")({
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({ data: { title } }).then(() => {
      router.invalidate();
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>{todo.title}</div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button type="submit">Add</Button>
        </form>
      </main>
    </SidebarProvider>
  );
}
