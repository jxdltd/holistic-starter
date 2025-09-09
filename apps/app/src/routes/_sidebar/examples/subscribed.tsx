import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_sidebar/examples/subscribed")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_sidebar/examples/subscribed"!</div>;
}
