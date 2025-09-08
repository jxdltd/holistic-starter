import { jsxs, jsx } from 'react/jsx-runtime';
import { S as SidebarProvider, A as AppSidebar, a as SidebarTrigger } from './sidebar-CMr7WcgC.mjs';
import { R as Route$4 } from './ssr.mjs';
import './button-Coqm6M7W.mjs';
import 'better-auth/react';
import 'better-auth/client/plugins';
import '@polar-sh/better-auth';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'react';
import 'lucide-react';
import '@radix-ui/react-dialog';
import '@radix-ui/react-tooltip';
import '@tanstack/react-router';
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

function Home() {
  const {
    user
  } = Route$4.useLoaderData();
  return /* @__PURE__ */ jsxs(SidebarProvider, { children: [
    /* @__PURE__ */ jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(SidebarTrigger, {}),
      /* @__PURE__ */ jsxs("div", { children: [
        "Hello, ",
        user.email,
        "!"
      ] })
    ] })
  ] });
}

export { Home as component };
//# sourceMappingURL=index-DtB9_qbj.mjs.map
