import { NextFunction, Request, Response } from "express";
import { debugService } from "../../app/services/debug.service";

export const debugController = async function (
	_: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const result = await debugService.getAllUsers();
		res.send(result);
	} catch (error) {
		next(error);
	}
};
