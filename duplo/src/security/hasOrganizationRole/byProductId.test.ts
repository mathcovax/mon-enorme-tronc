import { duploTesting } from "@test/setup";
import { productData } from "@test/data/product";
import { hasOrganizationRoleByProductId } from "./byProductId";
import { Response } from "@duplojs/duplojs";

describe("hasOrganizationRoleByProductId", () => {
	it("product notfound", async () => {
		const res: Response = await duploTesting
			.testAbstractRoute(hasOrganizationRoleByProductId.abstractRoute)
			.setRequestProperties({
				params: {
					productId: "tete"
				},
			})
			.mockChecker(
				0,
				{ info: "product.notfound", data: null }
			)
			.launch();
		expect(res.information).toBe("product.notfound");
	});

	it("product exist", async () => {
		const res = await duploTesting
			.testAbstractRoute(hasOrganizationRoleByProductId.abstractRoute)
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					productId: "tete"
				},
			})
			.mockChecker(
				0,
				{ info: "product.exist", data: productData }
			)
			.mockProcess(
				1,
				{}
			)
			.launch();

		expect(res).toStrictEqual({
			accessTokenContent: {},
			product: productData
		});
	});
});
