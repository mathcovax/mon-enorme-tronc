import { MockS3 } from "@test/mocks/providers";
import { S3Service } from "./S3";
import { ReadStream, createReadStream } from "fs";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

vi.mock("fs");

describe("S3 service", () => {
	beforeEach(() => {
		MockS3.reset();
	});

	it("post", async () => {
		MockS3.set("send", async (v: unknown) => v);
		vi.mocked(createReadStream).mockReturnValue(new ReadStream());
		const result = await S3Service.post("toto", "lolo", "ttttt.png");

		expect(result).instanceof(PutObjectCommand);

	});

	it("delete", async () => {
		MockS3.set("send", async (v: unknown) => v);
		const result = await S3Service.delete("toto", "lolo");

		expect(result).instanceof(DeleteObjectCommand);

	});
});
