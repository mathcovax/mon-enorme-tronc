import { duploTesting } from "@test/setup";
import { MockPrisma } from "@test/mocks/providers";
import { inputOrganization, organizationExistCheck } from "./organization";

describe("organization checker", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("find organization by id", async () => {
		const spy = vi.fn(() => ({}));
		MockPrisma.set("organization", "findFirst", spy);

		const result = await duploTesting.testChecker(organizationExistCheck, inputOrganization.id("12212"));

		expect(spy).lastCalledWith({ where: { id: "12212" } });
		expect(result.info).toBe("organization.exist");
	});

	it("find organization by name", async () => {
		const spy = vi.fn(() => ({}));
		MockPrisma.set("organization", "findFirst", spy);

		const result = await duploTesting.testChecker(organizationExistCheck, inputOrganization.name("12212"));

		expect(spy).lastCalledWith({ where: { name: "12212" } });
		expect(result.info).toBe("organization.exist");
	});

	it("not found", async () => {
		const spy = vi.fn(() => null);
		MockPrisma.set("organization", "findFirst", spy);

		const result = await duploTesting.testChecker(organizationExistCheck, inputOrganization.name("12212"));

		expect(result.info).toBe("organization.notfound");
	});
});
