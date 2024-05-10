import { duploTesting } from "@test/setup";
import { categoryExistCheck } from "./category";
import { MockPrisma } from "@test/mocks/providers";

describe("category service", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("find category", async () => {
		const category = {};
		const spy = vi.fn(async () => category);
		MockPrisma.set("category", "findFirst", spy);

		const res = await duploTesting
			.testChecker(categoryExistCheck, "test");

		expect(spy).lastCalledWith({
			where: { name: "test" }
		});
		expect(res.info).toBe("category.exist");
	});

	it("notfound category", async () => {
		MockPrisma.set("category", "findFirst", () => null);
		const res = await duploTesting
			.testChecker(categoryExistCheck, "");

		expect(res.info).toBe("category.notfound");
	});
});
