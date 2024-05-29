import { MockPrisma } from "@test/mocks/providers";
import { duploTesting } from "@test/setup";
import { POST } from ".";
import { navigationItemData } from "@test/data/navigationItem";

describe("POST /navigation-item", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("navigation item limit", async () => {
		MockPrisma.set("navigation_item", "count", async () => 10);

		const res = await duploTesting
			.testRoute(POST("GET", ""))
			.setRequestProperties({
				body: navigationItemData
			})
			.launch();

		expect(res.information).toBe("navigationItem.limit");
	});

	it("post navigation item", async () => {
		MockPrisma.set("navigation_item", "count", async () => 1);
		const spy = vi.fn(async () => navigationItemData);
		MockPrisma.set("navigation_item", "create", spy);

		const res = await duploTesting
			.testRoute(POST("GET", ""))
			.setRequestProperties({
				body: navigationItemData
			})
			.launch();

		expect(res.information).toBe("navigationItem.created");
		expect(spy).lastCalledWith({
			data: {
				parentCategoryName: "test",
				priority: 10,
				type: "PARENT_CATEGORY"
			}
		});
	});
});
