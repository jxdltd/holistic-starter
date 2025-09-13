import { db } from "@repo/database";
import * as schema from "@repo/database/schema";
import { resend } from "@repo/mail";
import { InviteEmail } from "@repo/mail/emails/invite";
import { VerifyEmail } from "@repo/mail/emails/magic-link";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, organization } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";
import { env } from "./env";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		github: {
			clientId: env().GITHUB_CLIENT_ID ?? "",
			clientSecret: env().GITHUB_CLIENT_SECRET ?? "",
		},
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	plugins: [
		reactStartCookies(),
		organization({
			async sendInvitationEmail({ email, id, organization }) {
				const inviteLink = `${env().APP_URL}/invite/${id}`;

				await resend.emails.send({
					from: env().RESEND_FROM_EMAIL,
					to: email,
					subject: `You're invited to join ${organization.name}`,
					react: <InviteEmail callbackUrl={inviteLink} org={organization} />,
				});
			},
		}),
		magicLink({
			sendMagicLink: async ({ email, url }) => {
				await resend.emails.send({
					from: env().RESEND_FROM_EMAIL,
					to: email,
					subject: "Magic Link",
					react: <VerifyEmail callbackUrl={url} />,
				});
			},
		}),
	],
});
