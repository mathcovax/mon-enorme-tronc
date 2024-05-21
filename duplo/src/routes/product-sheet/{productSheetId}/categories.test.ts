import { MockPrisma } from "@test/mocks/providers";
import { GET } from "./categories";
import { duploTesting } from "@test/setup";
import { categoryData } from "@test/data/category";

describe("GET /product-sheet/{productSheetId}/categories", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("get categories where product", async () => {
		const spy = vi.fn(async() => [{ category: categoryData }]);
		MockPrisma.set("product_sheet_to_category", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", "/product-sheet/1234/categories"))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					productSheetId: "1234"
				},
			})
			.mockChecker(
				"productSheetExist",
				{ info: "productSheet.exist", data: { id: "1234" } }
			)
			.mockProcess(
				"hasOrganizationRole",
				{ }
			)
			.launch();

		console.log(res.body);

		expect(res.information).toBe("productSheet.categories");
		expect(spy).lastCalledWith({
			where: {
				productSheetId: "1234"
			},
			select: {
				category: true
			},
		});
	});
});
