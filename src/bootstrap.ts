import https from "https";
import http from "http";
import { server } from "./infrastructure/server";
import { enviroment } from "./app/common/config";
import { createDatabaseConnection } from "./app/common/mongooseConnection";
import { ListenOptions } from "net";
import { bindApiRoutes } from "./infrastructure/routers/routes.manager";
import { serverLoggerService } from "./app/common/loggers";

void main().catch((err) => {
	console.error(err);
	process.exit(1);
});

type ServerError = Error & { code: string };

async function main() {
	const { port, mongodb, main_host } = enviroment;
	// const { certificates } = enviroment;

	const mainMongoDriver = createDatabaseConnection(mongodb.uri());

	void (await mainMongoDriver.connect().catch((e) => {
		serverLoggerService.error(e);
		console.log("conection to database failed, server cannot continue,");
		process.exit(1);
	}));

	const logServerStatus = () => {
		console.log(
			`Server currently running in at: http://${main_host}:${port}`,
		);
	};

	const app = server();

	void (await bindApiRoutes(app));

	const serverConfig: ListenOptions = { port, host: main_host };

	const mainHttpServer = http
		.createServer(app)
		/* https://ADDRESS:PORT/ */
		.listen(serverConfig, logServerStatus);

	mainHttpServer.on("error", (e: ServerError) => {
		if (e.code && e.code === "EADDRINUSE") {
			console.error("Address in use, retrying...");
			setTimeout(() => {
				mainHttpServer.close();
				mainHttpServer.listen(serverConfig, logServerStatus);
			}, 1500);
		}
	});

	process.on("SIGINT", async () => {
		await mainMongoDriver.disconnect();
		process.exit(0);
	});
}

/*
	Use this one for https instead
	const mainHttpsServer = https
		.createServer(
			{
				key: readFileSync(certificates.localhost.key),
				cert: readFileSync(certificates.localhost.certificate),
			},
			app,
		)
		.listen(serverConfig, logServerStatus)
*/
