import { MockPrisma } from "@test/mocks/providers";
import { DELETE } from "./{productSheetId}";
import { duploTesting } from "@test/setup";

describe("DELETE /category/{categoryId}/product-sheet/{productSheetId}", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("separate category to product", async () => {
		const spy = vi.fn(() => null);
		MockPrisma.set("product_sheet_to_category", "deleteMany", spy);

		const res = await duploTesting
			.testRoute(DELETE("DELETE", "/category/1234/product-sheet/1234"))
			.setRequestProperties({
				params: {
					categoryId: "1234",
					productSheetId: "1234"
				}
			})
			.mockChecker(
				"categoryExist",
				{ info: "category.exist", data: { id: "1234" } },
			)
			.mockChecker(
				"productSheetExist",
				{ info: "product_sheet.exist", data: { id: "1234" } }
			)
			.launch();

		expect(spy).lastCalledWith({
			where: {
				categoryId: "1234",
				productSheetId: "1234"
			}
		});
		expect(res.information).toBe("product_sheet_to_category.delete");
	});

	it("separate category to product - category notfound", async () => {
		const res = await duploTesting
			.testRoute(DELETE("DELETE", "/category/1234/product-sheet/1234"))
			.setRequestProperties({
				params: {
					categoryId: "1234",
					productSheetId: "1234"
				}
			})
			.mockChecker(
				"categoryExist",
				{ info: "category.notfound", data: { id: "1234" } },
			)
			.mockChecker(
				"productSheetExist",
				{ info: "product_sheet.exist", data: { id: "1234" } }
			)
			.launch();
		expect(res.information).toBe("category.notfound");
	});

	it("separate category to product - product_sheet notfound", async () => {
		const res = await duploTesting
			.testRoute(DELETE("DELETE", "/category/1234/product-sheet/1234"))
			.setRequestProperties({
				params: {
					categoryId: "1234",
					productSheetId: "1234"
				}
			})
			.mockChecker(
				"categoryExist",
				{ info: "category.exist", data: { id: "1234" } },
			)
			.mockChecker(
				"productSheetExist",
				{ info: "product_sheet.notfound", data: { id: "1234" } }
			)
			.launch();
		expect(res.information).toBe("product_sheet.notfound");
	});
});
