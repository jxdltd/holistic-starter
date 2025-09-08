import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { db, eq } from "@repo/database";
import { todo } from "@repo/database/schema";
import { inngest } from "@repo/jobs/client";
import { authenticatedMiddleware } from "./auth";

const createTodoSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
});

export const createTodo = createServerFn()
  .validator(createTodoSchema)
  .middleware([authenticatedMiddleware])
  .handler(async ({ context, data }) => {
    const id = data.id ?? crypto.randomUUID();

    await db.insert(todo).values({
      id,
      title: data.title,
      userId: context.user.id,
    });

    await inngest.send({
      name: "todo/created",
      data: {
        todo: {
          id,
        },
      },
    });

    return { id };
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
