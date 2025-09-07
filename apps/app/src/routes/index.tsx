import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@repo/ui/components/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <div className="bg-primary">Hello</div>
      <Button>Hello, World!</Button>
    </div>
  );
}
