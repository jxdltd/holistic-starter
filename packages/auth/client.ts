import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
// import { polarClient } from "@polar-sh/better-auth";

export const auth = createAuthClient({
	plugins: [magicLinkClient()],
});
