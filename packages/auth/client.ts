import {
	lastLoginMethodClient,
	magicLinkClient,
	organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const auth = createAuthClient({
	plugins: [magicLinkClient(), organizationClient(), lastLoginMethodClient()],
});
