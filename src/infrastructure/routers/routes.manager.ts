import { Express } from "express"
import { readdir } from "fs/promises"
import { join } from "path"

export const bindApiRoutes = async function (app: Express) {
	const path = join(__dirname, "api")
	try {
		const fileList = await readdir(path)

		fileList.forEach(async (route) => {
			const folderPath = join(path, route)
			const module = await import(folderPath)
			app.use("/api", module.default)
		})
	} catch (error) {
		console.log(error)
	}
}
