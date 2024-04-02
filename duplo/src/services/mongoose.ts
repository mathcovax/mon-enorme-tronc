import mongooseClient  from "mongoose";

export let mongoose: typeof mongooseClient;

export const awaiting = mongooseClient.connect(ENV.MONGO_DATABASE_URL)
	.then((initializedMongoose) => {
		mongoose = initializedMongoose;
	});
