import { MockPrisma } from "@test/mocks/providers";
import { duploTesting } from "@test/setup";
import { GET } from ".";
import { navigationItemData } from "@test/data/navigationItem";

describe("GET /navigation-items", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("get navigation items", async() => {
		const spy = vi.fn(async () => [navigationItemData]);
		MockPrisma.set("navigation_item", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.launch();

		expect(res.information).toBe("navigationItems");
		expect(spy).lastCalledWith({
			orderBy: {
				priority: "asc"
			},
			take: 10
		});
	});
});
