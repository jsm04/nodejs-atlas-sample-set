import mongoose, { ConnectOptions } from "mongoose";

export function createDatabaseConnection(
	uri: string,
	options: ConnectOptions = {},
) {
	const connect = async () => {
		try {
			await mongoose.connect(uri, options);
		} catch (error) {
			console.log(error);
		}
	};

	const disconnect = async () => {
		try {
			await mongoose.disconnect();
		} catch (error) {
			console.log(error);
		}
	};

	return { connect, disconnect };
}
