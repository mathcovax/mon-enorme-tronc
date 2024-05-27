import { duploTesting } from "@test/setup";
import { parentCategoryExistCheck } from "./parentCategory";
import { MockPrisma } from "@test/mocks/providers";

describe("parent category checker", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("find by name", async () => {
		const parentCategory = {};
		const spy = vi.fn(async () => parentCategory);
		MockPrisma.set("parent_category", "findFirst", spy);

		const res = await duploTesting
			.testChecker(parentCategoryExistCheck, "test");

		expect(spy).lastCalledWith({
			where: { name: "test" }
		});
		expect(res.info).toBe("parentCategory.exist");
	});

	it("notfound", async () => {
		MockPrisma.set("parent_category", "findFirst", () => null);
		const res = await duploTesting
			.testChecker(parentCategoryExistCheck, "143535");

		expect(res.info).toBe("parentCategory.notfound");
	});
});
