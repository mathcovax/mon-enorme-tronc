import { duploTesting } from "@test/setup";
import { MockPrisma } from "@test/mocks/providers";
import { inputArticle, articleExistCheck } from "./article";

describe("article checker", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("find by id", async () => {
		const article = {};
		const spy = vi.fn(async () => article);
		MockPrisma.set("article", "findFirst", spy);

		const res = await duploTesting
			.testChecker(articleExistCheck, inputArticle.id("1234"));

		expect(spy).lastCalledWith({
			where: { id: "1234" }
		});
		expect(res.info).toBe("article.exist");
	});

	it("find by productSheetId", async () => {
		const article = {};
		const spy = vi.fn(async () => article);
		MockPrisma.set("article", "findFirst", spy);

		const res = await duploTesting
			.testChecker(articleExistCheck, inputArticle.productSheetId("1234"));

		expect(spy).lastCalledWith({
			where: { productSheetId: "1234" }
		});
		expect(res.info).toBe("article.exist");
	});

	it("notfound", async () => {
		MockPrisma.set("article", "findFirst", () => null);
		const res = await duploTesting
			.testChecker(articleExistCheck, inputArticle.id("143535"));

		expect(res.info).toBe("article.notfound");
	});
});
