import { duploTesting } from "@test/setup";
import { MockPrisma } from "@test/mocks/providers";
import { inputProductSheet, productSheetExistCheck } from "./productSheet";

describe("product_sheet checker", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("find by name", async () => {
		const product_sheet = {};
		const spy = vi.fn(async () => product_sheet);
		MockPrisma.set("product_sheet", "findFirst", spy);

		const res = await duploTesting
			.testChecker(productSheetExistCheck, inputProductSheet.name("test"));

		expect(spy).lastCalledWith({
			where: { name: "test" }
		});
		expect(res.info).toBe("product_sheet.exist");
	});

	it("find by id", async () => {
		const product_sheet = {};
		const spy = vi.fn(async () => product_sheet);
		MockPrisma.set("product_sheet", "findFirst", spy);

		const res = await duploTesting
			.testChecker(productSheetExistCheck, inputProductSheet.id("1234"));

		expect(spy).lastCalledWith({
			where: { id: "1234" }
		});
		expect(res.info).toBe("product_sheet.exist");
	});

	it("notfound", async () => {
		MockPrisma.set("product_sheet", "findFirst", () => null);
		const res = await duploTesting
			.testChecker(productSheetExistCheck, inputProductSheet.id("143535"));

		expect(res.info).toBe("product_sheet.notfound");
	});
});
