import { duploTesting } from "@test/setup";
import { GET } from ".";
import { MockPrisma } from "@test/mocks/providers";

describe("GET /organizations", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("get organizations", async () => {
		const spy = vi.fn(() => []);
		MockPrisma.set("organization", "findMany", spy);

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setRequestProperties({
				query: {
					name: "eeee",
				}
			})
			.launch();
		
		expect(spy).lastCalledWith({
			where: {
				name: {
					contains: "eeee",
					mode: "insensitive",
				}
			},
			skip: 0,
			take: 10,
		});
		expect(res.information).toBe("organizations");
	});
});
