import { duploTesting } from "@test/setup";
import { GET } from ".";
import { MockPrisma } from "@test/mocks/providers";
import { navigationItemData } from "@test/data/navigationItem";

describe("GET /navigation-bar", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("invalie navigation bar itmes", async () => {
		const spy = vi.fn(async () => ([navigationItemData]));
		MockPrisma.set("navigation_item", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.launch();

		expect(res.information).toBe("INTERNAL_SERVER_ERROR");
	});

	it("get navigation bar", async () => {
		const spy = vi.fn(async () => ([
			{ 
				...navigationItemData, 
				parentCategory: { 
					categories: [{ category: { name: "tutu", imageUrl: "/oo.png" } }] 
				} 
			},
			{
				...navigationItemData, type: "LINK", title: "test", url: "/ooo" 
			},
			{ ...navigationItemData, type: "CATEGORY", categoryName: "toto" },
		]));
		MockPrisma.set("navigation_item", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.launch();
		

		expect(res.information).toBe("navigationBar");
	});
});
