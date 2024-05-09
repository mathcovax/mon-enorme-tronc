import { duploTesting } from "@test/setup";
import { adminPanelEntry, basicEntry } from "./entry";

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
});
