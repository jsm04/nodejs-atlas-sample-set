import { Request, Response, NextFunction } from "express";
import { serverLoggerService } from "../../app/common/loggers";
import { HttpError } from "../../app/common/utils/HttpError";

export const httpErrorHandler = function (
	e: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	next(e);
};
