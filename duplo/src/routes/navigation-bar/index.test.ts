import { duploTesting } from "@test/setup";
import { GET } from ".";
import { MockPrisma } from "@test/mocks/providers";
import { navigationItem } from "@test/data/navigationItem";

describe("GET /navigation-bar", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("invalie navigation bar itmes", async () => {
		const spy = vi.fn(async () => ([navigationItem]));
		MockPrisma.set("navigation_item", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.launch();

		expect(res.information).toBe("INTERNAL_SERVER_ERROR");
	});

	it("get navigation bar", async () => {
		const spy = vi.fn(async () => ([
			{ 
				...navigationItem, 
				parentCategory: { 
					categories: [{ category: { name: "tutu", imageUrl: "/oo.png" } }] 
				} 
			},
			{
				...navigationItem, type: "LINK", title: "test", url: "/ooo" 
			},
			{ ...navigationItem, type: "CATEGORY", categoryName: "toto" },
		]));
		MockPrisma.set("navigation_item", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.launch();
		

		expect(res.information).toBe("navigationBar");
	});
});
