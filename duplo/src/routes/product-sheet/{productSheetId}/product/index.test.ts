import { MockPrisma } from "@test/mocks/providers";
import { POST } from ".";
import { duploTesting } from "@test/setup";
import { productSheetData } from "@test/data/productSheet";
import { productData } from "@test/data/product";
import { warehouseData } from "@test/data/warehouse";

describe("POST /product-sheet/{productSheetId}/product", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("warehouse notfound", async () => {
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
				{ info: "warehouse.notfound", data: null }
			)
			.launch();

		expect(res.information).toBe("warehouse.notfound");
	});

	it("sku already use", async () => {
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
				{ info: "warehouse.exist", data: warehouseData }
			)
			.mockChecker(
				1,
				{ info: "product.exist", data: warehouseData }
			)
			.launch();

		expect(res.information).toBe("product.sku.alreadyUse");
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
			.mockChecker(
				1,
				{ info: "product.notfound", data: null }
			)
			.launch();

		expect(spy).lastCalledWith({
			data: {
				sku: "test",
				warehouseId: "test",
				productSheetId: "",
				organizationId: "",

			}
		});
		expect(res.information).toBe("product.created");
	});
});
