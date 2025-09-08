import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuth } from "@repo/functions/auth";
import { Button } from "@repo/ui/components/button";
import { products } from "@repo/billing/products";

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
  return (
    <div>
      <h1>Billing</h1>
      <Button asChild>
        <a href={`/api/checkout?products=${products.pro.id}`}>Checkout</a>
      </Button>
    </div>
  );
}
