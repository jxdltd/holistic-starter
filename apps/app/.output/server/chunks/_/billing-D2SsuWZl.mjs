import { jsxs, jsx } from 'react/jsx-runtime';
import { a as auth, B as Button } from './button-Coqm6M7W.mjs';
import { useQuery } from '@tanstack/react-query';
import 'better-auth/react';
import 'better-auth/client/plugins';
import '@polar-sh/better-auth';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';

function RouteComponent() {
  const benefitsQuery = useQuery({
    queryKey: ["benefits"],
    queryFn: async () => {
      const {
        data
      } = await auth.customer.benefits.list({
        query: {
          page: 1,
          limit: 10
        }
      });
      return data;
    }
  });
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const {
        data
      } = await auth.customer.orders.list({
        query: {
          page: 1,
          limit: 10,
          productBillingType: "one_time"
        }
      });
      return data;
    }
  });
  const subscriptionsQuery = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const {
        data
      } = await auth.customer.subscriptions.list({
        query: {
          page: 1,
          limit: 10,
          active: true
        }
      });
      return data;
    }
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Billing" }),
    /* @__PURE__ */ jsx("pre", { children: JSON.stringify(benefitsQuery.data, null, 2) }),
    /* @__PURE__ */ jsx("pre", { children: JSON.stringify(ordersQuery.data, null, 2) }),
    /* @__PURE__ */ jsx("pre", { children: JSON.stringify(subscriptionsQuery.data, null, 2) }),
    /* @__PURE__ */ jsx(Button, { onClick: () => auth.checkout({
      slug: "pro"
    }), children: "Checkout" })
  ] });
}

export { RouteComponent as component };
//# sourceMappingURL=billing-D2SsuWZl.mjs.map
