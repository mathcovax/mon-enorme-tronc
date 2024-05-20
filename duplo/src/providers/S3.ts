import { S3Client, HeadBucketCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

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
		await S3.send(new HeadBucketCommand({ Bucket: ENV.MINIO_BUCKET }));
	}
	catch {
		await S3.send(new CreateBucketCommand({ Bucket: ENV.MINIO_BUCKET }));
	}
});
