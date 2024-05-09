import { duploTesting } from "@test/setup";
import { hasPrimordialRole } from "./hasPrimordialRole";
import { Response } from "@duplojs/duplojs";

describe("hasPrimordialRole", () => {
	it("user is connected", async () => {
		const floorValue = await duploTesting
			.testAbstractRoute(hasPrimordialRole.abstractRoute)
			.setDefaultFloorValue({
				accessTokenContent: { primordialRole: "ADMIN" }
			})
			.launch();

		expect(floorValue).toStrictEqual({ accessTokenContent: { primordialRole: "ADMIN" } });
	});

	it("user is not connected", async () => {
		const res: Response = await duploTesting
			.testAbstractRoute(hasPrimordialRole.abstractRoute)
			.setDefaultFloorValue({
				accessTokenContent: "CUSTOMER"
			})
			.launch();

		expect(res.information).toStrictEqual("user.role.invalid");
	});
});
