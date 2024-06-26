import { duploTesting } from "@test/setup";
import { GET } from "./users";
import { MockPrisma } from "@test/mocks/providers";
import { userToOrganizationData } from "@test/data/userToOrganization";
import { userData } from "@test/data/user";
import { organizationData } from "@test/data/organization";

describe("GET /organization/{organizationId}/users", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("get organization users", async () => {
		const spy = vi.fn(
			async () => [userToOrganizationData].map(v => ({ ...v, user: userData }))
		);
		MockPrisma.set("user_to_organization", "findMany", spy);

		const res = await duploTesting.testRoute(GET("GET", ""))
			.setDefaultFloorValue({ organization: organizationData })
			.setRequestProperties({
				query: {
					page: 2,
					email: "toto",
				}
			})
			.launch();
			
		expect(res.information).toBe("organization.users");
		expect(spy).lastCalledWith({
			where: {
				organizationId: "eee",
				user: {
					email: {
						contains: "toto",
						mode: "insensitive",
					}
				}
			},
			select: {
				organizationRole: true,
				user: true
			},
			take: 10,
			skip: 20,
		});
	});
});
