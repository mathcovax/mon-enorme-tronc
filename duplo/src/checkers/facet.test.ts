import { duploTesting } from "@test/setup";
import { MockPrisma } from "@test/mocks/providers";
import { facetData } from "@test/data/facet";
import { facetExistCheck } from "./facet";

describe("facet checker", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("find by type and productSheetId", async () => {
		const spy = vi.fn(async () => facetData);
		MockPrisma.set("facet", "findUnique", spy);

		const res = await duploTesting
			.testChecker(facetExistCheck, { type: "COLOR", productSheetId: "111" });

		expect(spy).lastCalledWith({
			where: { 
				type_productSheetId: {
					type: "COLOR", 
					productSheetId: "111" 
				}
			}
		});
		expect(res.info).toBe("facet.exist");
	});

	it("notfound", async () => {
		MockPrisma.set("facet", "findUnique", () => null);
		const res = await duploTesting
			.testChecker(facetExistCheck, { type: "COLOR", productSheetId: "111" });

		expect(res.info).toBe("facet.notfound");
	});
});
