import { MockPrisma } from "@test/mocks/providers";
import { GET } from "./categories";
import { duploTesting } from "@test/setup";
import { categoryData } from "@test/data/category";
import { productSheetData } from "@test/data/productSheet";

describe("GET /product-sheet/{productSheetId}/categories", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("get categories where product", async () => {
		const spy = vi.fn(async() => [{ category: categoryData }]);
		MockPrisma.set("product_sheet_to_category", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", "/product-sheet/1234/categories"))
			.setDefaultFloorValue({ productSheet: productSheetData })
			.launch();

		expect(res.information).toBe("productSheet.categories");
		expect(spy).lastCalledWith({
			where: {
				productSheetId: ""
			},
			select: {
				category: true
			},
			take: 5
		});
	});
});
