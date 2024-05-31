import { MockPrisma } from "@test/mocks/providers";
import { PATCH } from "./{sku}";
import { duploTesting } from "@test/setup";
import { productData } from "@test/data/product";

describe("PATCH /product/{sku}", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("update porduct", async () => {
		const spy = vi.fn(() => productData);
		MockPrisma.set("product", "update", spy);
	
		const res = await duploTesting
			.testRoute(PATCH("PATCH", "/product-sheet/1234"))
			.setDefaultFloorValue({ product: productData })
			.setRequestProperties({
				body: {
					status: "WRONG",
				}
			})
			.launch();
			
		expect(res.information).toBe("product.edited");
		expect(spy).lastCalledWith({
			where: {
				sku: "la grosse tete de liam euhh enfaite non xD"
			},
			data: {
				status: "WRONG",
			},
		});
	});
});
