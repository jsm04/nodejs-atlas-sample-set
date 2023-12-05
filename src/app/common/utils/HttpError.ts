import { StatusCodes, getReasonPhrase, getStatusCode } from "http-status-codes";

export class HttpError extends Error {
	statusCode: StatusCodes;
	statusMessage: string;
	constructor(message: string, status: StatusCodes) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		this.statusCode = status;
		this.statusMessage = getReasonPhrase(this.statusCode);
	}
}
