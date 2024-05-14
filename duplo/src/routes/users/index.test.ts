import { duploTesting } from "@test/setup";
import { GET } from ".";
import { MockPrisma } from "@test/mocks/providers";

describe("GET /users", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("get users", async () => {
		const spy = vi.fn(() => []);
		MockPrisma.set("user", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setRequestProperties({
				query: {
					email: "eeee",
				}
			})
			.launch();
		
		expect(spy).lastCalledWith({
			where: {
				email: {
					contains: "eeee",
					mode: "insensitive",
				}
			},
			skip: 0,
			take: 10,
		});
		expect(res.information).toBe("users");
	});
});
