import { createWriteStream } from "node:fs";
import morgan from "morgan";
import { enviroment } from "./config";
import { createLogger, format, transports } from "winston";

const { is_development, is_production, paths } = enviroment;
const dir = is_production ? paths.logs.production : paths.logs.dev;

const removeEscapeCharacters = format((info) => {
	if (info.message) {
		info.message = info.message.replace(/\x1B\[\d+m/g, ""); // Remove escape characters
	}
	return info;
});

const createPersistencyLogger = () => {
	const logger = createLogger({
		level: "info",
		format: format.combine(
			removeEscapeCharacters(),
			format.json(),
			format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
			format.prettyPrint(),
		),
		transports: [
			new transports.File({
				filename: dir + "combined.log",
			}),
			new transports.File({
				filename: dir + "warn.log",
				level: "warn",
			}),
			new transports.File({
				filename: dir + "error.log",
				level: "error",
			}),
		],
	});

	if (is_development) {
		logger.add(
			new transports.Console({
				format: format.combine(format.simple(), format.prettyPrint()),
			}),
		);
	}

	return logger;
};

const serverLoggerService = createPersistencyLogger();

const requestLogger = morgan("common", {
	stream: createWriteStream(dir + "access.log", { flags: "a" }),
});

export { requestLogger, serverLoggerService };
