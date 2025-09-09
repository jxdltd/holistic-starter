import { todosElectricCollection } from "@repo/collections/todos-electric";
import { getAuth } from "@repo/functions/auth";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Input } from "@repo/ui/components/input";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_sidebar/examples/sync-electric")({
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
      .orderBy(({ todo }) => todo.created_at, "desc")
  );

  console.log(todos);

  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todosElectricCollection.insert({
      id: crypto.randomUUID(),
      created_at: new Date(),
      completed: false,
      user_id: user.id,
      title,
    });
    setTitle("");
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Sync with Electric</h1>
      <p className="mb-4">A simple todo list built with Electric SQL.</p>
      <div className="mb-4">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2">
            <Checkbox />
            <span>{todo.title}</span>
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
