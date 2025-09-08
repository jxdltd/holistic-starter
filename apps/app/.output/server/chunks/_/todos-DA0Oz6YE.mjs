import z from 'zod';
import { e as createServerRpc, f as createServerFn, j as authenticatedMiddleware, k as db, t as todo, l as inngest } from './ssr.mjs';
import { eq } from 'drizzle-orm';
import '@tanstack/react-router';
import 'react/jsx-runtime';
import '@tanstack/react-query';
import 'drizzle-orm/neon-http';
import '@t3-oss/env-core';
import 'drizzle-orm/pg-core';
import 'better-auth';
import 'better-auth/adapters/drizzle';
import 'better-auth/react-start';
import 'better-auth/plugins';
import 'resend';
import '@react-email/components';
import '@polar-sh/better-auth';
import '@polar-sh/sdk';
import 'tiny-invariant';
import 'tiny-warning';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import 'inngest';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

const createTodoSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1)
});
const createTodo_createServerFn_handler = createServerRpc("Users_jamie_holistic-starter_packages_functions_todos_ts--createTodo_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return createTodo.__executeServer(opts, signal);
});
const getTodos_createServerFn_handler = createServerRpc("Users_jamie_holistic-starter_packages_functions_todos_ts--getTodos_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getTodos.__executeServer(opts, signal);
});
const createTodo = createServerFn().validator(createTodoSchema).middleware([authenticatedMiddleware]).handler(createTodo_createServerFn_handler, async ({
  context,
  data
}) => {
  var _a;
  const id = (_a = data.id) != null ? _a : crypto.randomUUID();
  await db.insert(todo).values({
    id,
    title: data.title,
    userId: context.user.id
  });
  await inngest.send({
    name: "todo/created",
    data: {
      todo: {
        id
      }
    }
  });
  return {
    id
  };
});
const getTodos = createServerFn().middleware([authenticatedMiddleware]).handler(getTodos_createServerFn_handler, async ({
  context
}) => {
  const todos = await db.select().from(todo).where(eq(todo.userId, context.user.id));
  return todos;
});

export { createTodo_createServerFn_handler, getTodos_createServerFn_handler };
//# sourceMappingURL=todos-DA0Oz6YE.mjs.map
