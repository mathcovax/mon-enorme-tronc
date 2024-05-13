import { duploTesting } from "@test/setup";
import { addressValidCheck } from "./address";
import { PostService } from "@services/post";

vi.mock("@services/post");

describe("address checker", () => {
	it("valid address", async () => {
		vi.mocked(PostService.checkAddress).mockReturnValue(Promise.resolve(true));

		const result = await duploTesting.testChecker(addressValidCheck, "");

		expect(result.info).toBe("address.valid");
	});

	it("invalid address", async () => {
		vi.mocked(PostService.checkAddress).mockReturnValue(Promise.resolve(false));

		const result = await duploTesting.testChecker(addressValidCheck, "");

		expect(result.info).toBe("address.invalid");
	});
});
