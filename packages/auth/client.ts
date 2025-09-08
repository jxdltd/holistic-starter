import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

export const auth = createAuthClient({
  plugins: [magicLinkClient()],
});
