import { MockPrisma } from "@test/mocks/providers";
import { POST } from ".";
import { duploTesting } from "@test/setup";
import { productSheetData } from "@test/data/productSheet";

describe("POST /product-sheet/{productSheetId}/category", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("attribute category to product sheet", async () => {
		const spy = vi.fn(() => null);
		const spy2 = vi.fn(() => 0);
		MockPrisma.set("product_sheet_to_category", "create", spy);
		MockPrisma.set("product_sheet_to_category", "count", spy2);

		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({ productSheet: productSheetData })
			.setRequestProperties({
				body: {
					categoryId: "1234"
				}
			})
			.mockChecker(
				0,
				{ info: "category.exist", data: { id: "1234" } },
			)
			.launch();

		expect(res.information).toBe("productSheet.category.linked");
		expect(spy2).lastCalledWith({
			where: {
				productSheetId: ""
			}
		});
		expect(spy).lastCalledWith({
			data: {
				productSheetId: "",
				categoryId: "1234"
			}
		});
	});

	it("product sheet count > 4", async () => {
		const spy = vi.fn(() => 5);
		MockPrisma.set("product_sheet_to_category", "count", spy);

		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({ productSheet: productSheetData })
			.setRequestProperties({
				body: {
					categoryId: "1234"
				}
			})
			.mockChecker(
				0,
				{ info: "category.exist", data: { id: "1234" } },
			)
			.launch();

		expect(res.information).toBe("product.categories.limit");
		expect(spy).lastCalledWith({
			where: {
				productSheetId: ""
			}
		});
	});

	it("category notfound", async () => {

		const res = await duploTesting
			.testRoute(POST("POST", "/catgory/test/product-sheet"))
			.setDefaultFloorValue({ productSheet: productSheetData })
			.setRequestProperties({
				body: {
					categoryId: "1234"
				}
			})
			.mockChecker(
				"categoryExist",
				{ info: "category.notfound", data: { id: "1234" } },
			)
			.launch();

		expect(res.information).toBe("category.notfound");
	});
});
