import { duploTesting } from "@test/setup";
import { GET } from ".";
import { MockPrisma } from "@test/mocks/providers";

describe("GET /users", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("get users", async () => {
		const spy = vi.fn(() => []);
		MockPrisma.set("user", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setRequestProperties({
				query: {
					email: "eeee",
					page: 3,
				}
			})
			.launch();

		expect(res.information).toBe("users");
		expect(spy).lastCalledWith({
			where: {
				email: {
					contains: "eeee",
					mode: "insensitive",
				},
				AND: {
					OR: undefined
				}
			},
			skip: 30,
			take: 10,
		});
	});

	it("get users with query role", async () => {
		const spy = vi.fn(() => []);
		MockPrisma.set("user", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setRequestProperties({
				query: {
					primordialRole: "ADMIN"
				}
			})
			.launch();

		expect(res.information).toBe("users");
		expect(spy).lastCalledWith({
			where: {
				AND: {
					OR: [{ primordialRole: "ADMIN" }]
				}
			},
			skip: 0,
			take: 10,
		});
	});
});
