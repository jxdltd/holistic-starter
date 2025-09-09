import { products } from "@repo/billing/products";
import { getSubscriptions } from "@repo/functions/billing";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_sidebar/examples/subscribed")({
	component: RouteComponent,
	loader: async () => {
		const subscriptions = await getSubscriptions();

		const hasProSubscription = subscriptions.some(
			(subscription) => subscription.product.id === products.pro.id,
		);

		if (!hasProSubscription) {
			throw redirect({ to: "/examples/billing" });
		}

		return {};
	},
});

function RouteComponent() {
	return <div>You are subscribed to the Pro plan</div>;
}
