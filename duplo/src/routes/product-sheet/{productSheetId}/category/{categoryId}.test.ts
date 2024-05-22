import { MockPrisma } from "@test/mocks/providers";
import { DELETE } from "./{categoryId}";
import { duploTesting } from "@test/setup";
import { productSheetData } from "@test/data/productSheet";

describe("DELETE /product-sheet/{productSheetId}/category/{categoryId}", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("separate category to product", async () => {
		const spy = vi.fn(() => null);
		MockPrisma.set("product_sheet_to_category", "deleteMany", spy);

		const res = await duploTesting
			.testRoute(DELETE("DELETE", ""))
			.setDefaultFloorValue({ productSheet: productSheetData })
			.setRequestProperties({
				params: {
					categoryId: "1234"
				}
			})
			.mockChecker(
				0,
				{ info: "category.exist", data: { id: "1234" } },
			)
			.launch();

		expect(res.information).toBe("productSheet.category.untied");
		expect(spy).lastCalledWith({
			where: {
				categoryId: "1234",
				productSheetId: ""
			}
		});
	});

	it("separate category to product - category notfound", async () => {
		const res = await duploTesting
			.testRoute(DELETE("DELETE", "/category/1234/product-sheet/1234"))
			.setDefaultFloorValue({ productSheet: productSheetData })
			.setRequestProperties({
				params: {
					categoryId: "1234"
				}
			})
			.mockChecker(
				0,
				{ info: "category.notfound", data: { id: "1234" } },
			)
			.launch();

		expect(res.information).toBe("category.notfound");
	});
});
