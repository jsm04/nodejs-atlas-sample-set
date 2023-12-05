import { Movies } from "../../domain/entities/movies.entity"
import { AbstractMongoRepository } from "../../domain/interfaces/Repository"
import { MoviesModel } from "../models/movies.model"

export class MoviesRepository extends AbstractMongoRepository<Movies> {
	constructor() {
		super(MoviesModel)
	}
}

export const moviesRepository = new MoviesRepository()
