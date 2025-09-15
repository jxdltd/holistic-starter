import { input } from "@inquirer/prompts";
import alchemy from "alchemy";
import { NeonProject } from "alchemy/neon";
import { $ } from "bun";

function installDependencies() {
	return $`bun install`;
}

const defaultConfig = {
	neonApiKey: process.env.NEON_API_KEY,
};

async function getConfig() {
	const neonApiKey = await input({
		default: defaultConfig.neonApiKey,
		message: "Enter your Neon API key",
	});

	return {
		neonApiKey,
	};
}

type Config = Awaited<ReturnType<typeof getConfig>>;

async function provisionResources(config: Config) {
	const projectName = "my-app";

	const app = await alchemy(projectName, {
		password: process.env.ALCHEMY_PASSWORD,
	});

	const project = await NeonProject(projectName, {
		name: projectName,
		apiKey: alchemy.secret(config.neonApiKey),
	});

	console.info("Copy the below into your .env files");
	console.info(
		`DATABASE_URL=${project.connection_uris[0].connection_uri.unencrypted}`,
	);

	await app.finalize();
}

installDependencies()
	.then(getConfig)
	.then(provisionResources)
	.catch(console.error);
