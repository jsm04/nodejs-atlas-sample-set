import { Request, Response, NextFunction } from "express"
import { StatusCodes, getReasonPhrase } from "http-status-codes"
import { serverLoggerService } from "../../app/common/loggers"

export const internalServerErrorHandler = function (
	e: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const setResponseStatus = (statusCode: StatusCodes) => {
		res.statusCode = statusCode
		const message = getReasonPhrase(statusCode)
		res.statusMessage = message
		console.log(e)
		serverLoggerService.warn(`${e}`)
	}

	void setResponseStatus(StatusCodes.INTERNAL_SERVER_ERROR)

	res.send("Ups! Something seems to gone wrong. Please try again later...")
}
