import { randomBytes } from "node:crypto";
import { input } from "@inquirer/prompts";
import { $ } from "bun";
import { Effect } from "effect";

const installDependencies = () =>
	Effect.tryPromise(async () => {
		await $`bun install`;
	});

const getAppUrl = () =>
	Effect.promise(() =>
		input({
			message: "Enter your app URL",
			default: "http://localhost:3000",
		}),
	);

const getDatabaseUrl = () =>
	Effect.promise(() =>
		input({
			message: "Enter your Neon database connection string",
		}),
	);

const getResendApiKey = () =>
	Effect.promise(() =>
		input({
			message: "Enter your Resend API key",
		}),
	);

const getResendFromEmail = () =>
	Effect.promise(() =>
		input({
			message: "Enter your Resend from email",
		}),
	);

const getBetterAuthSecret = () =>
	Effect.sync(() => {
		return randomBytes(32).toString("base64url");
	});

const getPolarAccessToken = () =>
	Effect.promise(() =>
		input({
			message: "Enter your Polar access token",
		}),
	);

const getElectricSourceId = () =>
	Effect.promise(() =>
		input({
			message: "Enter your Electric source ID",
		}),
	);

const getElectricSecret = () =>
	Effect.promise(() =>
		input({
			message: "Enter your Electric secret",
		}),
	);

const getSentryDsn = () =>
	Effect.promise(() =>
		input({
			message: "Enter your Sentry DSN",
		}),
	);

const getOpenaiApiKey = () =>
	Effect.promise(() =>
		input({
			message: "Enter your OpenAI API key",
		}),
	);

const getEnv = () =>
	Effect.gen(function* () {
		return {
			APP_URL: yield* getAppUrl(),
			DATABASE_URL: yield* getDatabaseUrl(),
			RESEND_API_KEY: yield* getResendApiKey(),
			RESEND_FROM_EMAIL: yield* getResendFromEmail(),
			BETTER_AUTH_SECRET: yield* getBetterAuthSecret(),
			POLAR_ACCESS_TOKEN: yield* getPolarAccessToken(),
			ELECTRIC_SOURCE_ID: yield* getElectricSourceId(),
			ELECTRIC_SECRET: yield* getElectricSecret(),
			VITE_SENTRY_DSN: yield* getSentryDsn(),
			OPENAI_API_KEY: yield* getOpenaiApiKey(),
		};
	});

const writeEnv = (path: string, env: Record<string, string>) =>
	Effect.promise(() =>
		Bun.write(
			path,
			Object.entries(env)
				.map(([key, value]) => `${key}=${value}`)
				.join("\n"),
		),
	);

const runDev = () => Effect.promise(() => $`bun run dev`);

const runMigrations = () => Effect.promise(() => $`bun run push`);

const program = Effect.gen(function* () {
	yield* installDependencies();

	const env = yield* getEnv();

	yield* writeEnv("./apps/app/.env", env);
	yield* writeEnv("./packages/database/.env", {
		DATABASE_URL: env.DATABASE_URL,
	});

	yield* runMigrations();

	//   yield* runDev();
});

Effect.runPromise(program).catch(console.error);
