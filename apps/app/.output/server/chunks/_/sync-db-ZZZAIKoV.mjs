import { jsxs, jsx } from 'react/jsx-runtime';
import { S as SidebarProvider, A as AppSidebar } from './sidebar-CMr7WcgC.mjs';
import { useState } from 'react';
import { I as Input } from './input-Cb3wVy8b.mjs';
import { B as Button } from './button-Coqm6M7W.mjs';
import { C as Checkbox } from './checkbox-b0oiSrLL.mjs';
import { useLiveQuery, createCollection, eq } from '@tanstack/react-db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import { b as Route$2, c as createTodo, g as getTodos } from './ssr.mjs';
import { QueryClient } from '@tanstack/query-core';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'lucide-react';
import '@radix-ui/react-dialog';
import '@radix-ui/react-tooltip';
import '@tanstack/react-router';
import 'better-auth/react';
import 'better-auth/client/plugins';
import '@polar-sh/better-auth';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-checkbox';
import '@tanstack/react-query';
import 'drizzle-orm/neon-http';
import '@t3-oss/env-core';
import 'zod';
import 'drizzle-orm/pg-core';
import 'better-auth';
import 'better-auth/adapters/drizzle';
import 'better-auth/react-start';
import 'better-auth/plugins';
import 'resend';
import '@react-email/components';
import '@polar-sh/sdk';
import 'tiny-invariant';
import 'tiny-warning';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import 'inngest';
import 'drizzle-orm';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

const queryClient = new QueryClient();
const todoCollection = createCollection(
  queryCollectionOptions({
    queryClient,
    queryKey: ["todos"],
    queryFn: async () => {
      return getTodos();
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const { modified: newTodo } = transaction.mutations[0];
      await createTodo({ data: { title: newTodo.title } });
    }
  })
);
function Home() {
  const {
    user
  } = Route$2.useLoaderData();
  const {
    data: todos
  } = useLiveQuery((q) => q.from({
    todo: todoCollection
  }).where(({
    todo
  }) => eq(todo.completed, false)).orderBy(({
    todo
  }) => todo.createdAt, "desc"));
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    todoCollection.insert({
      id: crypto.randomUUID(),
      createdAt: /* @__PURE__ */ new Date(),
      completed: false,
      userId: user.id,
      title
    });
    setTitle("");
  };
  return /* @__PURE__ */ jsxs(SidebarProvider, { children: [
    /* @__PURE__ */ jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxs("main", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Sync with TanStack DB" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "A simple todo list built with TanStack DB." }),
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: todos.map((todo) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Checkbox, {}),
        todo.title
      ] }, todo.id)) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2 p-3 bg-muted w-full rounded-lg", children: [
        /* @__PURE__ */ jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), className: "bg-white" }),
        /* @__PURE__ */ jsx(Button, { type: "submit", children: "Add" })
      ] })
    ] })
  ] });
}

export { Home as component };
//# sourceMappingURL=sync-db-ZZZAIKoV.mjs.map
