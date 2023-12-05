import {
	Model,
	FilterQuery,
	ProjectionType,
	QueryOptions,
	UpdateQuery,
} from "mongoose"

export abstract class AbstractMongoRepository<T> {
	constructor(protected readonly _model: Model<T>) {}

	get model() {
		return this._model
	}

	public async getById(
		id: string,
		projection: ProjectionType<T> = {},
		options: QueryOptions<T> = {},
	) {
		return await this._model.findById(id, projection, options).lean()
	}

	public async get(
		filter: FilterQuery<T> = {},
		projection: ProjectionType<T> = {},
		options: QueryOptions<T> = {},
	) {
		return await this._model.find(filter, projection, options).lean()
	}

	public async deleteOne(id: string, options: QueryOptions<T> = {}) {
		return await this._model.findByIdAndDelete(id, options).lean()
	}

	public async deleteWhere(
		filter: FilterQuery<T> = {},
		options: QueryOptions<T> = {},
	) {
		return await this._model.deleteMany(filter, options)
	}

	public async update(id: string, updateQuery: UpdateQuery<T>) {
		return await this._model.findByIdAndUpdate(id, updateQuery)
	}

	public async create(entity: T) {
		return await this._model.create(entity)
	}

	public get count() {
		return this._model.countDocuments()
	}
}
