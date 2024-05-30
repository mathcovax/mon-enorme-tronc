import { MockPrisma } from "@test/mocks/providers";
import { POST } from ".";
import { duploTesting } from "@test/setup";
import { parentCategoryData } from "@test/data/parentCategory";

describe("POST /parent-category", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("name already use", async () => {
		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setRequestProperties({
				body: {
					name: "toto"
				}
			})
			.mockChecker(0, { info: "parentCategory.exist", data: parentCategoryData })
			.launch();

		expect(res.information).toBe("parentCategory.name.alreadyUse");
	});

	it("post parent category", async () => {
		const spy = vi.fn(async () => parentCategoryData);
		MockPrisma.set("parent_category", "create", spy);

		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setRequestProperties({
				body: {
					name: "toto"
				}
			})
			.mockChecker(0, { info: "parentCategory.notfound", data: null })
			.launch();

		expect(res.information).toBe("parentCategory.created");
		expect(spy).lastCalledWith({
			data: {
				name: "toto"
			}
		});
	});
});
