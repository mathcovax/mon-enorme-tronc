import { duploTesting } from "@test/setup";
import { adminPanelEntry, authEntry, basicEntry } from "./entry";

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

	it("auth", async () => {
		const res1 = await duploTesting
			.testRoute(authEntry)
			.setRequestProperties({
				headers: {
					"access-token": "testes"
				}
			})
			.launch();

		expect(res1.information).toBe("entry.refuse");

		const res3 = await duploTesting
			.testRoute(authEntry)
			.launch();

		expect(res3.information).toBe("entry.accepted");
	});
});
