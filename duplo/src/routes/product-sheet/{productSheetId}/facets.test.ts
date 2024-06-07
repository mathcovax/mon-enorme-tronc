import { duploTesting } from "@test/setup";
import { GET } from "./facets";
import { productSheetData } from "@test/data/productSheet";
import { MockPrisma } from "@test/mocks/providers";
import { facetData } from "@test/data/facet";

describe("GET /product-sheet/{productSheetId}/facets", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("find facets", async () => {
		const spy = vi.fn(() => [facetData]);
		MockPrisma.set("facet", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setDefaultFloorValue({
				productSheet: productSheetData
			})
			.launch();

		expect(res.information).toBe("productSheet.facets");
		expect(spy).lastCalledWith({
			take: 7,
			where: {
				productSheetId: ""
			}
		});
	});
});
