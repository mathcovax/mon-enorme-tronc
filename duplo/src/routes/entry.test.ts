import { duploTesting } from "@test/setup";
import { adminPanelEntry, authEntry, basicEntry, contentPanelEntry, organizationOwnerEntry, organizationEntry } from "./entry";

describe("entry", () => {
	it("basic", async () => {
		const res = await duploTesting
			.testRoute(basicEntry)
			.launch();

		expect(res.information).toBe("entry.accepted");
	});

	it("adminPanel", async () => {
		const res = await duploTesting
			.testRoute(adminPanelEntry)
			.launch();

		expect(res.information).toBe("entry.accepted");
	});

	it("contentPanel", async () => {
		const res = await duploTesting
			.testRoute(contentPanelEntry)
			.launch();

		expect(res.information).toBe("entry.accepted");
	});

	it("auth", async () => {
		const res1 = await duploTesting
			.testRoute(authEntry)
			.mockChecker(0, { info: "", data: null })
			.launch();

		expect(res1.information).toBe("entry.refuse");

		const res3 = await duploTesting
			.testRoute(authEntry)
			.launch();

		expect(res3.information).toBe("entry.accepted");
	});

	it("organization", async () => {
		const res = await duploTesting
			.testRoute(organizationEntry)
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					organizationId: "tete"
				}
			})
			.mockChecker(
				0,
				{ info: "organization.hasNotUser", data: null }
			)
			.launch();

		expect(res.information).toBe("entry.refuse");

		const res1 = await duploTesting
			.testRoute(organizationEntry)
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					organizationId: "tete"
				}
			})
			.mockChecker(
				0,
				{ info: "organization.hasUser", data: null }
			)
			.launch();

		expect(res1.information).toBe("entry.accepted");
	});

	it("organization owner", async () => {
		const res = await duploTesting
			.testRoute(organizationOwnerEntry)
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					organizationId: "tete"
				}
			})
			.mockProcess(
				0,
				{ info: "organization.hasNotUser", data: null }
			)
			.launch();

		expect(res.information).toBe("entry.accepted");
	});
});
