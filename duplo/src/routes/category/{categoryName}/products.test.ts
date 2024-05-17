import { MockPrisma } from "@test/mocks/providers";
import { GET } from "./products";
import { duploTesting } from "@test/setup";

describe("GET /category/{categoryName}/products", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("category products", async () => {
		const product_sheet_to_category = [
			{
				product_sheet: {
					id: "",
					name: "",
					description: "",
					short_description: "",
					price: 0,
					created_at: new Date(),
					updated_at: new Date(),
				}
			}
		];
		const spy = vi.fn(async () => product_sheet_to_category);
		MockPrisma.set("product_sheet_to_category", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", "/category/test/products"))
			.setRequestProperties({ params: { categoryName: "test" } })
			.mockChecker(
				"categoryExist",
				{ info: "category.exist", data: { id: "1234", name: "test" } },
			)
			.launch();

		expect(spy).lastCalledWith({
			where: { category: { id: "1234" } },
			select: { product_sheet: true },
		});
		expect(res.information).toBe("category.products");
	});

	it("category notfound", async () => {
		const res = await duploTesting
			.testRoute(GET("GET", "/category/test/products"))
			.setRequestProperties({ params: { categoryName: "test" } })
			.mockChecker(
				"categoryExist",
				{ info: "category.notfound", data: { name: "test" } },
			)
			.launch();

		expect(res.information).toBe("category.notfound");
	});
});
