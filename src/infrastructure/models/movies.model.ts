import mongoose, { Schema } from "mongoose"
import { Movies } from "../../domain/entities/movies.entity"

export const MoviesModel = mongoose.model(
	"movies",
	new Schema<Movies>({}, { strict: false }),
	"movies",
)
