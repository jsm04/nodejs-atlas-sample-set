import mongoose, { Schema } from "mongoose";

export const debugModelFactory = (collectionName: string) =>
	mongoose.model("debug", new Schema({}, { strict: false }), collectionName);
