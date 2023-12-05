import express from "express"
import compression from "compression"
import helmet from "helmet"
import cors from "cors"
import { requestLogger, serverLoggerService } from "../app/common/loggers"
import { enviroment } from "../app/common/config"
import { internalServerErrorHandler } from "./middlewares/serverErrorHandler"
import { express as setUserAgent } from "express-useragent"
import {
	healthController,
	infoController,
} from "./controllers/server.controller"

export const server = function () {
	const { is_development } = enviroment
	const app = express()
	app.use(helmet())
	app.use(compression())
	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(requestLogger)
	app.use(setUserAgent())
	app.get("/health", healthController)

	if (is_development) {
		app.get("/info", infoController)
	}

	app.use(internalServerErrorHandler)
	return app
}
