import { testChecker } from "@test/helpers/checker";
import { inputUser, userExistCheck } from "./user";
import { MockPrisma } from "@test/mocks/providers";

describe("token service", () => {
	it("find user by id", async () => {
		const spy = vi.fn(() => ({}));
		MockPrisma.set("findFirst", spy);

		const result = await testChecker(userExistCheck, inputUser.id("12212"));

		expect(spy).lastCalledWith({where: {id: "12212"}});
		expect(result.info).toBe("user.exist");
	});

	it("find user by email", async () => {
		const spy = vi.fn(() => ({}));
		MockPrisma.set("findFirst", spy);

		const result = await testChecker(userExistCheck, inputUser.email("12212"));

		expect(spy).lastCalledWith({where: {email: "12212"}});
		expect(result.info).toBe("user.exist");
	});

	it("not found", async () => {
		const spy = vi.fn(() => null);
		MockPrisma.set("findFirst", spy);

		const result = await testChecker(userExistCheck, inputUser.email("12212"));

		expect(result.info).toBe("user.notfound");
	});
});
