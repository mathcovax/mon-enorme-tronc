import { duploTesting } from "@test/setup";
import { MockPrisma } from "@test/mocks/providers";
import { imageProductSheetExist } from "./imageProductSheet";
import { imageProductSheetData } from "@test/data/imagesProductSheet";

describe("imageProductSheet checker", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("find by id", async () => {
		const spy = vi.fn(async () => imageProductSheetData);
		MockPrisma.set("image_product_sheet", "findFirst", spy);

		const res = await duploTesting
			.testChecker(imageProductSheetExist, "yyy");

		expect(spy).lastCalledWith({
			where: { id: "yyy" }
		});
		expect(res.info).toBe("imageProductSheet.exist");
	});

	it("notfound", async () => {
		MockPrisma.set("image_product_sheet", "findFirst", () => null);
		const res = await duploTesting
			.testChecker(imageProductSheetExist, "zzz");

		expect(res.info).toBe("imageProductSheet.notfound");
	});
});
