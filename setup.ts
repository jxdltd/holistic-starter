import alchemy from "alchemy";
import { NeonProject } from "alchemy/neon";

const projectName = "my-app";

const app = await alchemy(projectName, {
	password: process.env.ALCHEMY_PASSWORD,
});

const project = await NeonProject(projectName, {
	name: projectName,
});

console.info("Copy the below into your .env files");
console.info(
	`DATABASE_URL=${project.connection_uris[0].connection_uri.unencrypted}`,
);

await app.finalize();
