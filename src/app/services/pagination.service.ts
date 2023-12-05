import { FilterQuery, ObjectId, QueryOptions } from "mongoose"

export class PaginationService<T> {
	private pageSize: number
	private totalPages: number

	constructor(documentsCount: number, pageSize: number = 3) {
		this.pageSize = pageSize
		this.totalPages = documentsCount / this.pageSize
	}

	public buildPaginationQuery(page: number): QueryOptions<T> {
		return { skip: (page - 1) * this.pageSize, limit: this.pageSize }
	}

	public buildPaginationIdQuery(
		lastId: ObjectId,
	): [FilterQuery<T>, QueryOptions<T>] {
		return [{ _id: { $gt: lastId } }, { limit: this.pageSize }]
	}

	public get pagesCount() {
		return this.totalPages
	}
}
