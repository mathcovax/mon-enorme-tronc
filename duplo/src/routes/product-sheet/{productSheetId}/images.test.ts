import { duploTesting } from "@test/setup";
import { productSheetData } from "@test/data/productSheet";
import { MockPrisma } from "@test/mocks/providers";
import { imageProductSheetData } from "@test/data/imagesProductSheet";
import { GET } from "./images";

describe("get /product-sheet/{productSheetId}/images", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	
	it("productSheet images", async () => {
		const spy = vi.fn(async () => [imageProductSheetData]);
		MockPrisma.set("image_product_sheet", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setDefaultFloorValue({
				productSheet: productSheetData
			})
			.launch();

		expect(res.information).toBe("productSheet.images");
		expect(spy).lastCalledWith({
			take: 6,
			where: {
				productSheetId: ""
			}
		});
	});
});
