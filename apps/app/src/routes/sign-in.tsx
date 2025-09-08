import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { auth } from "@repo/auth/client";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        auth.signIn.magicLink({ email });
      }}
    >
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button type="submit">Sign in</Button>
    </form>
  );
}
