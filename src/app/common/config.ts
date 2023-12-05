import "dotenv/config"
import os from "node:os"

function buildConfig() {
	const {
		NODE_ENV,
		PORT,
		MONGODB_PROTOCOL,
		MONGODB_USER,
		MONGODB_PASSWORD,
		MONGODB_HOSTNAME,
		MONGODB_PORT,
		MONGODB_DEV_PASSWORD,
		MONGODB_DEV_CLUSTER,
		MONGODB_DEV_COLLECTION,
	} = process.env

	const node_env = `${NODE_ENV}`
	const is_production = node_env === "production"
	const is_development = !is_production
	const cwd = process.cwd()
	const port = parseInt(PORT || "8080")
	const main_host = "127.0.0.1"

	const mongodb = {
		protocol: `${MONGODB_PROTOCOL}`,
		user: `${MONGODB_USER}`,
		password: `${MONGODB_PASSWORD || ""}`,
		dev_cluster: `${MONGODB_DEV_CLUSTER || ""}`,
		dev_password: `${MONGODB_DEV_PASSWORD || ""}`,
		hostname: `${MONGODB_HOSTNAME || ""}`,
		port: `${parseInt(MONGODB_PORT || "27017")}`,
		collection: `${MONGODB_DEV_COLLECTION || ""}`,
		uri: function () {
			if (is_production) {
				return `${this.protocol}${this.user}:${this.password}@${this.hostname}:${this.port}`
			} else {
				return `mongodb+srv://admin:${this.dev_password}@${this.dev_cluster}.mongodb.net/${this.collection}?retryWrites=true&w=majority`
			}
		},
	}

	const certificates = {
		localhost: {
			key: cwd + "/certs" + "/localhost" + "/localhost.decrypted.key",
			certificate: cwd + "/certs" + "/localhost" + "/localhost.crt",
		},
	}

	const system = {
		network_interfaces: os.networkInterfaces(),
		platform: os.platform(),
		cpus: os.cpus(),
		uptime: os.uptime(),
	}

	const paths = {
		logs: {
			production: __dirname + "/logs/production/",
			dev: process.cwd() + "/logs/dev/",
		},
	}

	return {
		node_env,
		system,
		cwd,
		is_production,
		is_development,
		port,
		main_host,
		mongodb,
		certificates,
		paths,
	}
}

export const enviroment = buildConfig()
