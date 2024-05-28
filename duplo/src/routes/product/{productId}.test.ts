import { MockPrisma } from "@test/mocks/providers";
import { PATCH } from "./{productId}";
import { duploTesting } from "@test/setup";
import { productData } from "@test/data/product";
import { warehouseData } from "@test/data/warehouse";

describe("/product/{productSheetId}", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	describe("PATCH", () => {
		it("update porduct", async () => {
			const spy = vi.fn(() => productData);
			MockPrisma.set("product", "update", spy);
	
			const res = await duploTesting
				.testRoute(PATCH("PATCH", "/product-sheet/1234"))
				.setDefaultFloorValue({ product: productData })
				.setRequestProperties({
					body: {
						sku: "la grosse tete de liam euhh enfaite non xD",
						status: "WRONG",
					}
				})
				.mockChecker(
					0,
					{ info: "warehouse.exist", data: "zeub" }
				)
				.mockChecker(
					1,
					{ info: "productSheet.exist", data: "zeub" }
				)
				.launch();
			
			expect(res.information).toBe("product.edited");
			expect(spy).lastCalledWith({
				where: {
					id: ""
				},
				data: {
					sku: "la grosse tete de liam euhh enfaite non xD",
					status: "WRONG",
				},
			});
		});
	});

	it("warehouse notfound", async () => {
		const res = await duploTesting
			.testRoute(PATCH("PATCH", "/product-sheet/1234"))
			.setDefaultFloorValue({ product: productData })
			.setRequestProperties({
				body: {
					sku: "la grosse tete de liam euhh enfaite non xD",
					status: "WRONG",
					warehouseId: "zeub",
				}
			})
			.mockChecker(
				0,
				{ info: "warehouse.notfound", data: null }
			)
			.launch();

		expect(res.information).toBe("warehouse.notfound");
	});

	it("productSheet notfound", async () => {
		const res = await duploTesting
			.testRoute(PATCH("PATCH", "/product-sheet/1234"))
			.setDefaultFloorValue({ product: productData })
			.setRequestProperties({
				body: {
					sku: "la grosse tete de liam euhh enfaite non xD",
					status: "WRONG",
					warehouseId: "zeub",
					productSheetId: "zeub",
				}
			})
			.mockChecker(
				0,
				{ info: "warehouse.exist", data: warehouseData }
			)
			.mockChecker(
				1,
				{ info: "productSheet.notfound", data: null }
			)
			.launch();
		
		expect(res.information).toBe("productSheet.notfound");
	});
});
