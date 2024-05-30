import { duploTesting } from "@test/setup";
import { GET } from ".";
import { MockPrisma } from "@test/mocks/providers";
import { parentCategoryData } from "@test/data/parentCategory";

describe("GET /parent-categories", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("get parent category", async () => {
		const spy = vi.fn(async () => [parentCategoryData]);
		MockPrisma.set("parent_category", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setRequestProperties({
				query: {
					page: 2,
					name: "toto",
					withCategories: "true"
				}
			})
			.launch();

		expect(res.information).toBe("parentCategories");
		expect(spy).lastCalledWith({
			where: {
				name: {
					contains: "toto",
					mode: "insensitive"
				},
			},
			select: { 
				name: true,
				categories: {
					select: {
						categoryName: true
					}
				} 
			},
			skip: 20,
			take: 10
		});
		
	});
});
