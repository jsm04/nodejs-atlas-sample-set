import { Router } from "express"
import {
	moviesGetController,
	moviesGetPaginationController,
} from "../../controllers/movies.controller"

const moviesRouter = Router()

moviesRouter.get("/movies", moviesGetController)
moviesRouter.get("/movies/pages/:pageNumber", moviesGetPaginationController)

export default moviesRouter
