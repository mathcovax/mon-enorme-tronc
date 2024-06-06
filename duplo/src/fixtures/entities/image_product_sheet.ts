import { prisma } from "../prismaClient";
import { uuidv7 } from "uuidv7";
import type { product_sheet } from "@prisma/client";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as env from "../../env";
import { Buffer } from "buffer";

const S3 = new S3Client({
	region: "local",
	forcePathStyle: true,
	endpoint: env.default.MINIO_URL,
	credentials: {
		accessKeyId: env.default.MINIO_ROOT_USER,
		secretAccessKey: env.default.MINIO_ROOT_PASSWORD,
	}
});

export const getRandomImage = async () => 
	Buffer.from(await (await fetch("https://picsum.photos/200")).arrayBuffer());


export const makeImageProductSheet = async (
	productSheet: product_sheet,
) => {
	const imageId = uuidv7();
	const imageKey = `/${productSheet.organizationId}/${productSheet.id}/${imageId}image${Date.now()}.jpg`;

	S3.send(
		new PutObjectCommand({
			Bucket: env.default.MINIO_BUCKET_PRODUCT_SHEET_IMAGES,
			Key: imageKey,
			Body: await getRandomImage(),
		})
	);

	await prisma.image_product_sheet.create({
		data: {
			id: imageId,
			productSheetId: productSheet.id,
			organizationId: productSheet.organizationId,
			key: imageKey,
			url: `/${ENV.MINIO_PREFIX}/${env.default.MINIO_BUCKET_PRODUCT_SHEET_IMAGES}${imageKey}`,
		}
	});
};
