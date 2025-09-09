import { products } from "@repo/billing/products";
import { getAuth } from "@repo/functions/auth";
import { getSubscriptions } from "@repo/functions/billing";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_sidebar/examples/billing")({
	component: RouteComponent,
	loader: async () => {
		const session = await getAuth();

		if (!session) {
			throw redirect({ to: "/sign-in" });
		}

		return {
			subscriptions: await getSubscriptions(),
		};
	},
});

function RouteComponent() {
	const { subscriptions } = Route.useLoaderData();

	return (
		<div className="p-4 flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Billing</h1>
			<div>
				<h2 className="text-lg font-bold">Subscriptions</h2>
				{subscriptions.map((subscription) => (
					<div key={subscription.id}>{subscription.product.name}</div>
				))}
			</div>
			<div>
				<h2 className="text-lg font-bold">Products</h2>
				{Object.values(products).map((product) => (
					<div key={product.id} className="flex items-center gap-2">
						<span>{product.name}</span>
						<Button asChild size="sm">
							<a href={`/api/billing/checkout?product=${product.id}`}>
								Checkout
							</a>
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
