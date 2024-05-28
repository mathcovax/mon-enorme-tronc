import { MockPrisma } from "@test/mocks/providers";
import { duploTesting } from "@test/setup";
import { GET } from "./products";
import { organizationData } from "@test/data/organization";

describe("GET /organization/{organizationId}/products", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("get products", async () => {
		const spy = vi.fn(() => []);
		MockPrisma.set("product", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setDefaultFloorValue({ organization: organizationData })
			.setRequestProperties({
				query: {
					sku: "eeee",
				}
			})
			.launch();

		expect(spy).lastCalledWith({
			where: {
				organizationId: "eee",
				sku: {
					contains: "eeee",
					mode: "insensitive",
				}
			},
			skip: 0,
			take: 10,
			include: {
				productSheet: {
					select: {
						name: true,
					},
				},
				warehouse: {
					select: {
						name: true,
					},
				},
			},
		});
		expect(res.information).toBe("products.found");
	});
});
