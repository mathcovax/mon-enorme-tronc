import { duploTesting } from "@test/setup";
import { MockPrisma } from "@test/mocks/providers";
import { inputOrganization, organizationExistCheck, organizationHasUserCheck } from "./organization";

describe("organization checker", () => {
	beforeEach(() => {
		MockPrisma.reset();
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

	it("organization has user", async() => {
		const spy = vi.fn(() => ({}));
		MockPrisma.set("user_to_organization", "findFirst", spy);

		const result = await duploTesting.testChecker(organizationHasUserCheck, { organizationId: "tt", userId: "test" });

		expect(result.info).toBe("organization.hasUser");
		expect(spy).lastCalledWith({ 
			where: { organizationId: "tt", userId: "test" } ,
			select: {
				organizationId: true,
				organizationRole: true,
				user: false,
				userId: true,
			}
		});
	});

	it("organization has not user", async() => {
		const spy = vi.fn(() => null);
		MockPrisma.set("user_to_organization", "findFirst", spy);

		const result = await duploTesting.testChecker(organizationHasUserCheck, { organizationId: "tt", userId: "test" });

		expect(result.info).toBe("organization.hasNotUser");
	});

	it("organization has not user", async() => {
		const spy = vi.fn(() => ({ user: {} }));
		MockPrisma.set("user_to_organization", "findFirst", spy);

		const result = await duploTesting.testChecker(organizationHasUserCheck, { organizationId: "tt", userId: "test" });

		expect(result.info).toBe("organization.hasUserWithMoreData");
		expect(spy).lastCalledWith({ 
			where: { organizationId: "tt", userId: "test" } ,
			select: {
				organizationId: true,
				organizationRole: true,
				user: false,
				userId: true,
			}
		});
	});
});
