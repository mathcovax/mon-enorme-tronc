import { MockPrisma } from "@test/mocks/providers";
import { POST } from ".";
import { duploTesting } from "@test/setup";
import { productSheetData } from "@test/data/productSheet";
import { productData } from "@test/data/product";

describe("POST /product-sheet/{productSheetId}/product", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("post product sheet created", async () => {

		const spy = vi.fn(() => productData);
		MockPrisma.set("product", "create", spy);

		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({ productSheet: productSheetData })
			.setRequestProperties({
				body: {
					sku: "test",
					warehouseId: "test",
				}
			})
			.mockChecker(
				0,
				{ info: "warehouse.exist", data: null }
			)
			.launch();

		expect(spy).lastCalledWith({
			data: {
				sku: "test",
				warehouseId: "test",
				productSheetId: "",
				organizationId: "",
				status: "IN_STOCK"

			}
		});
		expect(res.information).toBe("product.created");
	});
});
