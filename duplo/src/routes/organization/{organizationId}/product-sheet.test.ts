import { MockPrisma } from "@test/mocks/providers";
import { POST } from "./product-sheet";
import { duploTesting } from "@test/setup";

describe("POST /organization/{organizationId}/product-sheet", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("post product sheet created", async () => {
		const productSheet = {
			id: "",
			name: "",
			description: "",
			shortDescription: "",
			price: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
			organizationId: ""
		};
		const spy = vi.fn(() => productSheet);
		MockPrisma.set("product_sheet", "create", spy);

		const res = await duploTesting
			.testRoute(POST("POST", "/organization/1234/product-sheet"))
			.setRequestProperties({
				params: {
					organizationId: "1234"
				},
				body: {
					name: "test",
					description: "test",
					shortDescription: "test",
					price: 10,
				}
			})
			.mockChecker(
				"organizationExist",
				{ info: "organization.exist", data: { id: "1234" } },
			)
			.launch();

		expect(spy).lastCalledWith({
			data: {
				description: "test",
				name: "test",
				organizationId: "1234",
				shortDescription: "test",
				price: 10
			}
		});
		expect(res.information).toBe("product_sheet.created");
	});

	it("post product sheet error organization notfound", async () => {
		const res = await duploTesting
			.testRoute(POST("POST", "/organization/1234/product-sheet"))
			.setRequestProperties({
				params: {
					organizationId: ""
				},
				body: {
					name: "",
					description: "",
					shortDescription: "",
					price: 0,
				}
			})
			.mockChecker(
				"organizationExist",
				{ info: "organization.notfound", data: { id: "1234" } },
			)
			.launch();
		expect(res.information).toBe("organization.notfound");
	});
});
