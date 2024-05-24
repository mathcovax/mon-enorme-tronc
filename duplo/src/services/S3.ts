import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { createReadStream } from "fs";

export class S3Service {
	static post(bucket: string, key: string, pathFile: string,) {
		const stream = createReadStream(pathFile);

		return S3.send(
			new PutObjectCommand({
				Bucket: bucket,
				Key: key,
				Body: stream,
			})
		);
	}

	static delete(bucket: string, key: string) {
		return S3.send(
			new DeleteObjectCommand({
				Bucket: bucket,
				Key: key,
			})
		);
	}
}
