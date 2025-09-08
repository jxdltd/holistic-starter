import { e as createServerRpc, f as createServerFn, h as getWebRequest, i as auth } from './ssr.mjs';
import '@tanstack/react-router';
import 'react/jsx-runtime';
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
import '@polar-sh/better-auth';
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

const getAuth_createServerFn_handler = createServerRpc("src_auth_ts--getAuth_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getAuth.__executeServer(opts, signal);
});
const getAuth = createServerFn().handler(getAuth_createServerFn_handler, async () => {
  const request = getWebRequest();
  if (!request) {
    throw new Error("No request found");
  }
  const resp = await auth.api.getSession({
    headers: request.headers
  });
  if (!resp) {
    return null;
  }
  return {
    session: resp.session,
    user: resp.user
  };
});

export { getAuth_createServerFn_handler };
//# sourceMappingURL=auth-7xqi0ke8.mjs.map
