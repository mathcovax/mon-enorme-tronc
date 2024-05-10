import { MockPrisma } from "@test/mocks/providers";
import { GET } from "./products";
import { duploTesting } from "@test/setup";

describe("GET /category/{categoryName}/products", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("category products", async () => {
		const product_to_category = [
			{
				product: {
					id: "",
					name: "",
					description: "",
					price: 0,
					created_at: new Date(),
					updated_at: new Date()
				} 
			}
		];
		const spy = vi.fn(async () => product_to_category);
		MockPrisma.set("product_to_category", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", "/category/test/products"))
			.setRequestProperties({ params: { categoryName: "test" } })
			.mockChecker(
				"categoryExist",
				{ info: "category.exist", data: { id: "1234", name: "test" } },
				{ passCatch: true }
			)
			.launch();

		expect(spy).lastCalledWith({
			where: { category: { id: "1234" } },
			select: { product: true },
		});
		expect(res.information).toBe("category.products");
	});

	it ("category notfound", async () => {
		const res = await duploTesting
			.testRoute(GET("GET", "/category/test/products"))
			.setRequestProperties({ params: { categoryName: "test" } })
			.mockChecker(
				"categoryExist",
				{ info: "category.notfound", data: null },
				{ passCatch: true }
			)
			.launch();
		
		expect(res.information).toBe("category.notfound");
	});
});
