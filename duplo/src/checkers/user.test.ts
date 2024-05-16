import { duploTesting } from "@test/setup";
import { inputUser, userExistCheck } from "./user";
import { MockPrisma } from "@test/mocks/providers";

describe("user checker", () => {
	it("find user by id", async () => {
		const spy = vi.fn(() => ({}));
		MockPrisma.set("user", "findFirst", spy);

		const result = await duploTesting.testChecker(userExistCheck, inputUser.id("12212"));

		expect(spy).lastCalledWith({ where: { id: "12212" } });
		expect(result.info).toBe("user.exist");
	});

	it("find user by email", async () => {
		const spy = vi.fn(() => ({}));
		MockPrisma.set("user", "findFirst", spy);

		const result = await duploTesting.testChecker(userExistCheck, inputUser.email("12212"));

		expect(spy).lastCalledWith({ where: { email: "12212" } });
		expect(result.info).toBe("user.exist");
	});

	it("not found", async () => {
		const spy = vi.fn(() => null);
		MockPrisma.set("user", "findFirst", spy);

		const result = await duploTesting.testChecker(userExistCheck, inputUser.email("12212"));

		expect(result.info).toBe("user.notfound");
	});
});
