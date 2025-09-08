import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { authenticatedMiddleware } from "./auth";
import { db, eq } from "@repo/database";
import { todo } from "@repo/database/schema";

const createTodoSchema = z.object({
  title: z.string().min(1),
});

export const createTodo = createServerFn()
  .validator(createTodoSchema)
  .middleware([authenticatedMiddleware])
  .handler(async ({ context, data }) => {
    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 seconds

    await db.insert(todo).values({
      id: crypto.randomUUID(),
      title: data.title,
      userId: context.user.id,
    });
  });

export const getTodos = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(async ({ context }) => {
    const todos = await db
      .select()
      .from(todo)
      .where(eq(todo.userId, context.user.id));
    return todos;
  });
