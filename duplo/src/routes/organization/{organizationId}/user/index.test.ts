import { duploTesting } from "@test/setup";
import { MockPrisma } from "@test/mocks/providers";
import { POST } from ".";
import { userData } from "@test/data/user";

describe("POST /organization/{organizationId}/user", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("user not exist", async () => {
		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					organizationId: "tt",
					userId: "ee"
				},
				body: {
					email: "eeee",
					firstname: "zzz",
					lastname: "tttt",
					organizationRole: "ACCOUNTANT",
				}
			})
			.mockProcess(0, {})
			.mockChecker(
				1,
				{ info: "user.notfound", data: null }
			)
			.launch();
			
		expect(res.information).toBe("user.notfound");
	});

	it("organization has already user", async () => {
		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					organizationId: "tt",
					userId: "ee"
				},
				body: {
					email: "eeee",
					firstname: "zzz",
					lastname: "tttt",
					organizationRole: "ACCOUNTANT",
				}
			})
			.mockProcess(0, {})
			.mockChecker(
				1,
				{ info: "user.exist", data: userData }
			)
			.mockChecker(
				2,
				{ info: "organization.hasUser", data: null }
			)
			.launch();
			
		expect(res.information).toBe("organization.hasAlreadyUser");
	});

	it("add user to organization", async () => {
		const spy = vi.fn(async () => null);
		MockPrisma.set("user_to_organization", "create", spy);
			
		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					organizationId: "tt",
					userId: "ee"
				},
				body: {
					email: "eeee",
					firstname: "zzz",
					lastname: "tttt",
					organizationRole: "ACCOUNTANT",
				}
			})
			.mockProcess(0, {})
			.mockChecker(
				1,
				{ info: "user.exist", data: userData }
			)
			.mockChecker(
				2,
				{ info: "organization.hasNotUser", data: null }
			)
			.launch();
			
		expect(res.information).toBe("organization.user.add");
		expect(spy).lastCalledWith({
			data: {
				organizationId: "tt",
				userId: "rere",
				organizationRole: "ACCOUNTANT",
			}
		});
	});
});
