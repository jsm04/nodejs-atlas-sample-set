import {
	DebugRepository,
	debugRepository,
} from "../../infrastructure/repositories/debug.repository"

class DebugService {
	constructor(private readonly db: DebugRepository) {}
	public async getAllUsers() {
		return await this.db.get(
			{},
			{ password: 0, _id: 0 },
			{ limit: 10, sort: { name: 1 } },
		)
	}
}

export const debugService = new DebugService(debugRepository)
