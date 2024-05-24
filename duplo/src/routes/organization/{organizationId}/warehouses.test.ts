import { MockPrisma } from "@test/mocks/providers";
import { duploTesting } from "@test/setup";
import { GET } from "./warehouses";
import { organizationData } from "@test/data/organization";

describe("GET /organization/{organizationId}/warehouses", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("get warehouse", async () => {
		const spy = vi.fn(() => []);
		MockPrisma.set("warehouse", "findMany", spy);

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
		expect(res.information).toBe("warehouses.found");
	});
});
