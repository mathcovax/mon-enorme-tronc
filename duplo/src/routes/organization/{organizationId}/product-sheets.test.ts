import { MockPrisma } from "@test/mocks/providers";
import { duploTesting } from "@test/setup";
import { GET } from "./product-sheets";
import { organizationData } from "@test/data/organization";

describe("GET /organization/{organizationId}/product-sheets", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("get product-sheets", async () => {
		const spy = vi.fn(() => []);
		MockPrisma.set("product_sheet", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setDefaultFloorValue({ organization: organizationData })
			.setRequestProperties({
				query: {
					name: "eeee",
				}
			})
			.launch();

		expect(spy).lastCalledWith({
			where: {
				organizationId: "eee",
				name: {
					contains: "eeee",
					mode: "insensitive",
				}
			},
			skip: 0,
			take: 10,
		});
		expect(res.information).toBe("productSheets.found");
	});
});
