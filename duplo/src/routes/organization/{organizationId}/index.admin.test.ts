import { duploTesting } from "@test/setup";
import { PATCH } from "./index.admin";
import { MockPrisma } from "@test/mocks/providers";

describe("GET /organization/{organizationId}/suspended", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("patch notfound organization", async () => {
		const res = await duploTesting
			.testRoute(PATCH("PATCH", ""))
			.setRequestProperties({
				params: {
					organizationId: ""
				},
			})
			.mockChecker(
				0,
				{
					info: "organization.notfound",
					data: null
				}
			)
			.launch();

		expect(res.information).toBe("organization.notfound");
	});

	it("patch organization", async () => {
		const spy = vi.fn(() => undefined);
		MockPrisma.set("organization", "update", spy);

		const res = await duploTesting
			.testRoute(PATCH("PATCH", ""))
			.setRequestProperties({
				params: {
					organizationId: ""
				},
				body: { suspended: false }
			})
			.mockChecker(
				0,
				{
					info: "organization.exist",
					data: null
				}
			)
			.launch();

		expect(spy).lastCalledWith({
			where: { id: "" },
			data: { suspended: false }
		});
		expect(res.information).toBe("organization.edited");
	});
});
