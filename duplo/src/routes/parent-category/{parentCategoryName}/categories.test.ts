import { MockPrisma } from "@test/mocks/providers";
import { GET } from "./categories";
import { duploTesting } from "@test/setup";
import { parentCategoryData } from "@test/data/parentCategory";
import { categoryData } from "@test/data/category";

describe("GET /parent-category/{parentCategoryName}/categories", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("parent category notfound", async () => {
		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setRequestProperties({
				params: {
					parentCategoryName: "rrrr"
				},
			})
			.mockChecker(0, { info: "parentCategory.notfound", data: null })
			.launch();

		expect(res.information).toBe("parentCategory.notfound");
	});

	it("parent category notfound", async () => {
		const spy = vi.fn(async () => [{ category: categoryData }]);
		MockPrisma.set("category_to_parent_category", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setRequestProperties({
				params: {
					parentCategoryName: "rrrr"
				},
			})
			.mockChecker(0, { info: "parentCategory.exist", data: parentCategoryData })
			.launch();

		expect(res.information).toBe("parentCategory.categories");
		expect(spy).lastCalledWith({
			select: {
				category: true
			},
			take: 10,
			where: {
				parentCategoryName: "tulutu"
			}
		});
	});
});
