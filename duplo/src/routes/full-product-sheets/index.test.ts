import { duploTesting } from "@test/setup";
import { GET } from ".";
import { fullProductSheetModel } from "@mongoose/model";
import { fullProductSheetData } from "@test/data/fullProductSheet";

vi.mock("@mongoose/model");

describe("GET /full-product-sheets", () => {
	it("find fullProductSheet", async () => {
		const spy = vi.spyOn(fullProductSheetModel, "aggregate").mockResolvedValue([fullProductSheetData]);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.launch();

		expect(res.information).toBe("fullProductSheets");
		expect(spy).lastCalledWith([
			{ $skip: 0 },
			{ $limit: 50 }
		]);
	});
});
