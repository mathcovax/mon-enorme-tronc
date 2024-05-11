import { duploTesting } from "@test/setup";
import { GET } from ".";

describe("GET /user", () => {
	it("get user", async () => {
		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setDefaultFloorValue({
				accessTokenContent: { id: "" }
			})
			.mockChecker(
				0, 
				{
					info: "user.exist", 
					data: {
						id: "rere",
						email: "test",
						lastname: "DOE",
						firstname: "jhon",
						dateOfBirth: new Date(2002, 8, 13),
						address: "test",
						primordialRole: "",
					}
				}
			)
			.launch();
		
		expect(res.information).toBe("user");
	});
});
