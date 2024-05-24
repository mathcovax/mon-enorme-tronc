import { S3Client, HeadBucketCommand, CreateBucketCommand, PutBucketPolicyCommand } from "@aws-sdk/client-s3";

declare global {
	const S3: (typeof import("./S3"))["S3"];
}

//@ts-expect-error var 'global' cause type error.
export const S3 = global.S3 = new S3Client({
	region: "local",
	forcePathStyle: true,
	endpoint: ENV.MINIO_URL,
	credentials: {
		accessKeyId: ENV.MINIO_ROOT_USER,
		secretAccessKey: ENV.MINIO_ROOT_PASSWORD,
	}
});

duplo.addHook("beforeListenHttpServer", async () => {
	try {
		await S3.send(new HeadBucketCommand({ Bucket: ENV.MINIO_BUCKET_PRODUCT_SHEET_IMAGES }));
	}
	catch {
		await S3.send(new CreateBucketCommand({ Bucket: ENV.MINIO_BUCKET_PRODUCT_SHEET_IMAGES }));
		await S3.send(
			new PutBucketPolicyCommand({ 
				Bucket: ENV.MINIO_BUCKET_PRODUCT_SHEET_IMAGES, 
				Policy: JSON.stringify({
					Version: "2012-10-17",
					Statement: [
						{
							Effect: "Allow",
							Principal: {
								AWS: ["*"]
							},
							Action: ["s3:GetObject"],
							Resource: [
								`arn:aws:s3:::${ENV.MINIO_BUCKET_PRODUCT_SHEET_IMAGES}`,
								`arn:aws:s3:::${ENV.MINIO_BUCKET_PRODUCT_SHEET_IMAGES}/*`
							]
						}
					]
				})
			})
		);
	}
});
