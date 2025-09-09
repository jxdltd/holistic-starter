import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
// import { polarClient } from "@polar-sh/better-auth";

export const auth = createAuthClient({
	plugins: [magicLinkClient()],
});
