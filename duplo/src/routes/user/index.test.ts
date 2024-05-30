import { duploTesting } from "@test/setup";
import { GET, PATCH } from ".";
import { MockPrisma } from "@test/mocks/providers";
import { userData } from "@test/data/user";

describe("GET /user", () => {
	it("get user notfound", async () => {
		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setDefaultFloorValue({
				accessTokenContent: { id: "" }
			})
			.mockChecker(
				0,
				{
					info: "user.notfound",
					data: null
				}
			)
			.launch();

		expect(res.information).toBe("user.notfound");
	});

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
						primordialRole: "ADMIN",
						muted: false
					}
				}
			)
			.launch();
		expect(res.information).toBe("user");
	});
});

describe("PATCH /user", () => {
	it("patch user notfound", async () => {
		const res = await duploTesting
			.testRoute(PATCH("PATCH", ""))
			.setDefaultFloorValue({
				accessTokenContent: { id: "" }
			})
			.mockChecker(
				0,
				{
					info: "user.notfound",
					data: null
				}
			)
			.launch();

		expect(res.information).toBe("user.notfound");
	});

	it("patch user", async () => {
		const spy = vi.fn(async () => userData);
		MockPrisma.set("user", "update", spy);

		const res = await duploTesting
			.testRoute(PATCH("PATCH", ""))
			.setDefaultFloorValue({
				accessTokenContent: { id: "" }
			})
			.setRequestProperties({
				body: {
					lastname: "ROSBOULE",
					firstname: "Megue",
					address: "15 rue du Ketchup"
				}
			})
			.mockChecker(
				0,
				{
					info: "user.exist",
					data: userData
				}
			)
			.launch();

		expect(res.information).toBe("user.edited");
		expect(spy).lastCalledWith({
			where: {
				id: "rere"
			},
			data: {
				lastname: "ROSBOULE",
				firstname: "Megue",
				address: "15 rue du Ketchup"
			}
		});
	});
});
