import { MockPrisma } from "@test/mocks/providers";
import { duploTesting } from "@test/setup";
import { POST } from ".";
import { parentCategoryData } from "@test/data/parentCategory";
import { categoryData } from "@test/data/category";

describe("POST /parent-category/{parentCategoryName}/category", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("parent category notfound", async () => {
		const res = await duploTesting
			.testRoute(POST("PATCH", ""))
			.setRequestProperties({
				params: {
					parentCategoryName: "rrrr"
				},
				body: {
					categoryName: "TOTO"
				}
			})
			.mockChecker(0, { info: "parentCategory.notfound", data: null })
			.launch();

		expect(res.information).toBe("parentCategory.notfound");
	});

	it("category notfound", async () => {
		const res = await duploTesting
			.testRoute(POST("PATCH", ""))
			.setRequestProperties({
				params: {
					parentCategoryName: "rrrr"
				},
				body: {
					categoryName: "TOTO"
				}
			})
			.mockChecker(0, { info: "parentCategory.exist", data: parentCategoryData })
			.mockChecker(1, { info: "category.notfound", data: null })
			.launch();

		expect(res.information).toBe("category.notfound");
	});

	it("category limit", async () => {
		const spy = vi.fn(async () => 10);
		MockPrisma.set("category_to_parent_category", "count", spy);

		const res = await duploTesting
			.testRoute(POST("PATCH", ""))
			.setRequestProperties({
				params: {
					parentCategoryName: "rrrr"
				},
				body: {
					categoryName: "TOTO"
				}
			})
			.mockChecker(0, { info: "parentCategory.exist", data: parentCategoryData })
			.mockChecker(1, { info: "category.exist", data: categoryData })
			.launch();

		expect(res.information).toBe("parentCategory.categories.limit");
		expect(spy).lastCalledWith({
			where: {
				parentCategoryName: "tulutu"
			}
		});
	});

	it("post category to parent category", async () => {
		MockPrisma.set("category_to_parent_category", "count", async () => 1);
		const spy = vi.fn(async () => ({}));
		MockPrisma.set("category_to_parent_category", "create", spy);

		const res = await duploTesting
			.testRoute(POST("PATCH", ""))
			.setRequestProperties({
				params: {
					parentCategoryName: "rrrr"
				},
				body: {
					categoryName: "TOTO"
				}
			})
			.mockChecker(0, { info: "parentCategory.exist", data: parentCategoryData })
			.mockChecker(1, { info: "category.exist", data: categoryData })
			.launch();

		expect(res.information).toBe("parentCategory.category.linked");
		expect(spy).lastCalledWith({
			data: {
				categoryName: "super Cat",
				parentCategoryName: "tulutu",
			}
		});
	});
});
