import { Movies } from "../../domain/entities/movies.entity"
import {
	MoviesRepository,
	moviesRepository,
} from "../../infrastructure/repositories/movies.repository"
import { PaginationService } from "./pagination.service"

class MoviesService {
	private paginationService?: PaginationService<Movies>
	constructor(private readonly db: MoviesRepository) {}

	public async getAllMovies() {
		return await this.db.get({}, {}, { limit: 30 })
	}

	public async getPaginationQuery(page: number) {
		if (!this.paginationService) {
			const docCount = await this.db.count
			this.paginationService = new PaginationService(docCount)
		}
		return await this.db.get(
			{},
			{},
			this.paginationService.buildPaginationQuery(page),
		)
	}
}

export const moviesService = new MoviesService(moviesRepository)
