import { AbstractMongoRepository } from "../../domain/interfaces/Repository";
import { debugModelFactory } from "../models/debugModelFactory";

const UsersModel = debugModelFactory("users");

export class DebugRepository extends AbstractMongoRepository<any> {
	constructor() {
		super(UsersModel);
	}
}

export const debugRepository = new DebugRepository();
