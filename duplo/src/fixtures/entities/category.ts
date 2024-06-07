import type { category } from "@prisma/client";
import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";
import { getRandomImage } from "./image_product_sheet";
import { uuidv7 } from "uuidv7";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as env from "../../env";

const S3 = new S3Client({
	region: "local",
	forcePathStyle: true,
	endpoint: env.default.MINIO_URL,
	credentials: {
		accessKeyId: env.default.MINIO_ROOT_USER,
		secretAccessKey: env.default.MINIO_ROOT_PASSWORD,
	}
});

export const makeCategory = async (
	category?: Partial<category>
) => {
	const imageId = uuidv7();
	const imageKey = `/${imageId}category${Date.now()}.jpg`;
	
	S3.send(
		new PutObjectCommand({
			Bucket: env.default.MINIO_BUCKET_CONTENT,
			Key: imageKey,
			Body: await getRandomImage(),
		})
	);

	return await prisma.category.create({
		data: {
			name: category?.name || faker.commerce.department() + Math.floor(Math.random() * 1000),
			disabled: category?.disabled || false,
			imageKey,
			imageUrl: `/${ENV.MINIO_PREFIX}/${env.default.MINIO_BUCKET_CONTENT}${imageKey}`,
		}
	});
};
