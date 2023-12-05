import { AbstractMongoRepository } from "../../domain/interfaces/Repository"
import mongoose, { Schema } from "mongoose"

const debugModelFactory = (collectionName: string) =>
	mongoose.model(
		collectionName,
		new Schema({}, { strict: false }),
		collectionName,
	)

const UsersModel = debugModelFactory("users")

export class DebugRepository extends AbstractMongoRepository<any> {
	constructor() {
		super(UsersModel)
	}
}

export const debugRepository = new DebugRepository()
