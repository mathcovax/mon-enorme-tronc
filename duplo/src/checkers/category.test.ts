import { duploTesting } from "@test/setup";
import { categoryExistCheck, inputCategory } from "./category";
import { MockPrisma } from "@test/mocks/providers";

describe("category checker", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("find by name", async () => {
		const category = {};
		const spy = vi.fn(async () => category);
		MockPrisma.set("category", "findFirst", spy);

		const res = await duploTesting
			.testChecker(categoryExistCheck, inputCategory.name("test"));

		expect(spy).lastCalledWith({
			where: { name: "test" }
		});
		expect(res.info).toBe("category.exist");
	});

	it("find by id", async () => {
		const category = {};
		const spy = vi.fn(async () => category);
		MockPrisma.set("category", "findFirst", spy);

		const res = await duploTesting
			.testChecker(categoryExistCheck, inputCategory.id("143535"));

		expect(spy).lastCalledWith({
			where: { id: "143535" }
		});
		expect(res.info).toBe("category.exist");
	});

	it("notfound", async () => {
		MockPrisma.set("category", "findFirst", () => null);
		const res = await duploTesting
			.testChecker(categoryExistCheck, inputCategory.id("143535"));

		expect(res.info).toBe("category.notfound");
	});
});
