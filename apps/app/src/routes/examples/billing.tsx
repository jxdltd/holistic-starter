import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuth } from "@repo/functions/auth";
import { auth } from "@repo/auth/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@repo/ui/components/button";

export const Route = createFileRoute("/examples/billing")({
  component: RouteComponent,
  loader: async () => {
    const session = await getAuth();

    if (!session) {
      throw redirect({ to: "/sign-in" });
    }

    return {};
  },
});

function RouteComponent() {
  const benefitsQuery = useQuery({
    queryKey: ["benefits"],
    queryFn: async () => {
      const { data } = await auth.customer.benefits.list({
        query: {
          page: 1,
          limit: 10,
        },
      });
      return data;
    },
  });

  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await auth.customer.orders.list({
        query: {
          page: 1,
          limit: 10,
          productBillingType: "one_time",
        },
      });
      return data;
    },
  });

  const subscriptionsQuery = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const { data } = await auth.customer.subscriptions.list({
        query: {
          page: 1,
          limit: 10,
          active: true,
        },
      });
      return data;
    },
  });

  return (
    <div>
      <h1>Billing</h1>
      <pre>{JSON.stringify(benefitsQuery.data, null, 2)}</pre>
      <pre>{JSON.stringify(ordersQuery.data, null, 2)}</pre>
      <pre>{JSON.stringify(subscriptionsQuery.data, null, 2)}</pre>
      <Button
        onClick={() =>
          auth.checkout({
            slug: "pro",
          })
        }
      >
        Checkout
      </Button>
    </div>
  );
}
