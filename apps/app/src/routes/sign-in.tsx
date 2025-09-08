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
    <div className="flex flex-col items-center justify-center h-screen bg-accent">
      <form
        className="flex flex-col items-center justify-center gap-4 bg-card p-4 rounded-md w-full max-w-md border shadow-xs"
        onSubmit={(e) => {
          e.preventDefault();

          auth.signIn.magicLink({ email });
        }}
      >
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </div>
  );
}
