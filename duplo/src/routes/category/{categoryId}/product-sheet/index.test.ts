import { MockPrisma } from "@test/mocks/providers";
import { POST } from ".";
import { duploTesting } from "@test/setup";

describe("POST /catgory/{categoryId}/product-sheet", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("attribute category to product sheet", async () => {
		const spy = vi.fn(() => null);
		const spy2 = vi.fn(() => 0);
		MockPrisma.set("product_sheet_to_category", "create", spy);
		MockPrisma.set("product_sheet_to_category", "count", spy2);

		const res = await duploTesting
			.testRoute(POST("POST", "/catgory/test/product-sheet"))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					categoryId: "1234",
				},
				body: {
					productSheetId: "1234"
				}
			})
			.mockChecker(
				"productSheetExist",
				{ info: "productSheet.exist", data: { id: "1234" } }
			)
			.mockProcess(
				"hasOrganizationRole",
				{ }
			)
			.mockChecker(
				"categoryExist",
				{ info: "category.exist", data: { id: "1234" } },
			)
			.launch();

		expect(res.information).toBe("product_sheet_to_category.created");
		expect(spy2).lastCalledWith({
			where: {
				productSheetId: "1234"
			}
		});
		expect(spy).lastCalledWith({
			data: {
				productSheetId: "1234",
				categoryId: "1234"
			}
		});
	});

	it("product sheet count > 4", async () => {
		const spy = vi.fn(() => 5);
		MockPrisma.set("product_sheet_to_category", "count", spy);

		const res = await duploTesting
			.testRoute(POST("POST", "/catgory/test/product-sheet"))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					categoryId: "1234",
				},
				body: {
					productSheetId: "1234"
				}
			})
			.mockChecker(
				"productSheetExist",
				{ info: "productSheet.exist", data: { id: "1234" } }
			)
			.mockProcess(
				"hasOrganizationRole",
				{ }
			)
			.mockChecker(
				"categoryExist",
				{ info: "category.exist", data: { id: "1234" } },
			)
			.launch();

		expect(res.information).toBe("product.categories.limit");
		expect(spy).lastCalledWith({
			where: {
				productSheetId: "1234"
			}
		});
	});

	it("product sheet notfound", async () => {

		const res = await duploTesting
			.testRoute(POST("POST", "/catgory/test/product-sheet"))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					categoryId: "1234",
				},
				body: {
					productSheetId: "1234"
				}
			})
			.mockChecker(
				"productSheetExist",
				{ info: "productSheet.notfound", data: { id: "1234" } }
			)
			.launch();

		expect(res.information).toBe("productSheet.notfound");
	});

	it("category notfound", async () => {

		const res = await duploTesting
			.testRoute(POST("POST", "/catgory/test/product-sheet"))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					categoryId: "1234",
				},
				body: {
					productSheetId: "1234"
				}
			})
			.mockChecker(
				"productSheetExist",
				{ info: "productSheet.exist", data: { id: "1234" } }
			)
			.mockProcess(
				"hasOrganizationRole",
				{  }
			)
			.mockChecker(
				"categoryExist",
				{ info: "category.notfound", data: { id: "1234" } },
			)
			.launch();

		expect(res.information).toBe("category.notfound");
	});
});
