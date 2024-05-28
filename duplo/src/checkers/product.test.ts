import { duploTesting } from "@test/setup";
import { MockPrisma } from "@test/mocks/providers";
import { inputProduct, productExistCheck } from "./product";

describe("product checker", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("find by sku", async () => {
		const product = {};
		const spy = vi.fn(async () => product);
		MockPrisma.set("product", "findFirst", spy);

		const res = await duploTesting
			.testChecker(productExistCheck, inputProduct.sku("test"));

		expect(spy).lastCalledWith({
			where: { sku: "test" }
		});
		expect(res.info).toBe("product.exist");
	});

	it("find by id", async () => {
		const product = {};
		const spy = vi.fn(async () => product);
		MockPrisma.set("product", "findFirst", spy);

		const res = await duploTesting
			.testChecker(productExistCheck, inputProduct.id("1234"));

		expect(spy).lastCalledWith({
			where: { id: "1234" }
		});
		expect(res.info).toBe("product.exist");
	});

	it("notfound", async () => {
		MockPrisma.set("product", "findFirst", () => null);
		const res = await duploTesting
			.testChecker(productExistCheck, inputProduct.id("143535"));

		expect(res.info).toBe("product.notfound");
	});
});
