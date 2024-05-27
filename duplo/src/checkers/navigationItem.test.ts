import { duploTesting } from "@test/setup";
import { MockPrisma } from "@test/mocks/providers";
import { navigationItemExistCheck } from "./navigationItem";

describe("navigation item checker", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("find by title", async () => {
		const spy = vi.fn(async () => ({}));
		MockPrisma.set("navigation_item", "findFirst", spy);

		const res = await duploTesting
			.testChecker(navigationItemExistCheck, "test");

		expect(spy).lastCalledWith({
			where: { title: "test" }
		});
		expect(res.info).toBe("navigationItem.exist");
	});

	it("notfound", async () => {
		MockPrisma.set("navigation_item", "findFirst", () => null);
		const res = await duploTesting
			.testChecker(navigationItemExistCheck, "143535");

		expect(res.info).toBe("navigationItem.notfound");
	});
});
