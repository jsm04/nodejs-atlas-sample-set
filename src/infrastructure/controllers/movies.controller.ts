import { NextFunction, Request, Response } from "express"
import { moviesService } from "../../app/services/movies.service"

export const moviesGetController = async function (
	_: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const result = await moviesService.getAllMovies()
		res.send(result)
	} catch (error) {
		next(error)
	}
}

export const moviesGetPaginationController = async function (
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { pageNumber } = req.params
		const parsedPageNumber = parseInt(pageNumber)

		if (!parsedPageNumber) {
			res.send({ message: "Invalid request" })
		}

		const result = await moviesService.getPaginationQuery(parsedPageNumber)

		res.send(result)
	} catch (error) {
		next(error)
	}
}
