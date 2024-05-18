import { duploTesting } from "@test/setup";
import { POST } from ".";
import { MockPrisma } from "@test/mocks/providers";

describe("POST /organization", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("post organization with used name", async () => {
		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setRequestProperties({
				body: {
					name: "aaa",
					ownerId: ""
				}
			})
			.mockChecker(
				0, 
				{
					info: "organization.exist", 
					data: null
				}
			)
			.launch();
		
		expect(res.information).toBe("organization.alreadyExist");
	});

	it("post organization with notfound owner", async () => {
		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setRequestProperties({
				body: {
					name: "aaa",
					ownerId: ""
				}
			})
			.mockChecker(
				0, 
				{
					info: "organization.notfound", 
					data: null
				}
			)
			.mockChecker(
				1, 
				{
					info: "user.notfound", 
					data: null
				}
			)
			.launch();
		
		expect(res.information).toBe("user.notfound");
	});

	it("post organization with owner of other organization", async () => {
		const spy = vi.fn(() => ({}));
		MockPrisma.set("organization", "findFirst", spy);

		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setRequestProperties({
				body: {
					name: "aaa",
					ownerId: ""
				}
			})
			.mockChecker(
				0, 
				{
					info: "organization.notfound", 
					data: null
				}
			)
			.mockChecker(
				1, 
				{
					info: "user.exist", 
					data: { id: "1" }
				}
			)
			.launch();
		
		expect(spy).lastCalledWith({ where: { ownerId: "1" } });
		expect(res.information).toBe("user.alreadyOwner");
	});

	it("post organization", async () => {
		MockPrisma.set("organization", "findFirst", () => null);
		
		const spy = vi.fn(() => undefined);
		MockPrisma.set("organization", "create", spy);

		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setRequestProperties({
				body: {
					name: "aaaa",
					ownerId: "test"
				}
			})
			.mockChecker(
				0, 
				{
					info: "organization.notfound", 
					data: null
				}
			)
			.mockChecker(
				1, 
				{
					info: "user.exist", 
					data: { id: "1" }
				}
			)
			.launch();
		
		expect(res.information).toBe("organization.created");
		expect(spy).lastCalledWith({ 
			data: { 
				ownerId: "test", 
				name: "aaaa",
				userToOrganization: {
					create: {
						organizationRole: "OWNER",
						userId: "test"
					}
				}
			}, 
		});
	});
});
