import { db } from "@repo/database";
import * as schema from "@repo/database/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import { magicLink } from "better-auth/plugins";
import { resend } from "@repo/mail";
import { VerifyEmail } from "@repo/mail/emails/magic-link";
import { portal, checkout, polar as polarPlugin } from "@polar-sh/better-auth";
import { polar } from "@repo/billing";

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
    polarPlugin({
      client: polar,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "01dbcfb7-0946-4977-ae72-685871c80229", // ID of Product from Polar Dashboard
              slug: "pro", // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
            },
          ],
          successUrl: "/success?checkout_id={CHECKOUT_ID}",
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],
});
