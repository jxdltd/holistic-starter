import { db } from "@repo/database";
import * as schema from "@repo/database/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import { magicLink } from "better-auth/plugins";
import { resend } from "@repo/mail";
import { VerifyEmail } from "@repo/mail/emails/magic-link";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [
    reactStartCookies(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: "noreply@updates.buildhype.dev",
          to: email,
          subject: "Magic Link",
          react: <VerifyEmail to={{ email }} callbackUrl={url} />,
        });
      },
    }),
  ],
});
