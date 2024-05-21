import { MockPrisma } from "@test/mocks/providers";
import { duploTesting } from "@test/setup";
import { GET } from "./product-sheets";

describe("GET /organization/{organizationId}/product-sheets", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("get product-sheets", async () => {
		const spy = vi.fn(() => []);
		MockPrisma.set("product_sheet", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					organizationId: "1",
				},
				query: {
					name: "eeee",
				}
			})
			.mockProcess(
				"hasOrganizationRole",
				{ }
			)
			.launch();

		expect(spy).lastCalledWith({
			where: {
				organizationId: "1",
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
