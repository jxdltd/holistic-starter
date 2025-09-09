import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuth } from "@repo/functions/auth";
import { Button } from "@repo/ui/components/button";
import { products } from "@repo/billing/products";
import { getSubscriptions } from "@repo/functions/billing";

export const Route = createFileRoute("/_sidebar/examples/billing")({
	component: RouteComponent,
	loader: async () => {
		const session = await getAuth();

		if (!session) {
			throw redirect({ to: "/sign-in" });
		}

		return {
			subscriptions: await getSubscriptions(),
		}
	},
});

function RouteComponent() {
	const { subscriptions } = Route.useLoaderData();

	return (
		<div>
			<h1>Billing</h1>
			{subscriptions.map((subscription) => (
				<div key={subscription.id}>{subscription.product.name}</div>
			))}
			<Button asChild>
				<a href={`/api/checkout?products=${products.pro.id}`}>Checkout</a>
			</Button>
		</div>
	)
}
