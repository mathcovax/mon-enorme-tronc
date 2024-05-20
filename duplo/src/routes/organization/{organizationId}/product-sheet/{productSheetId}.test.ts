import { MockPrisma } from "@test/mocks/providers";
import { PUT } from "./{productSheetId}";
import { duploTesting } from "@test/setup";

describe("PUT /organization/{organizationId}/product-sheet/{productSheetId}", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("put product sheet updated", async () => {
		const productSheet = {
			id: "1234",
			name: "test",
			description: "test",
			shortDescription: "test",
			price: 10,
			createdAt: new Date(),
			updatedAt: new Date(),
			organizationId: "1234"
		};
		const spy = vi.fn(() => productSheet);
		MockPrisma.set("product_sheet", "update", spy);

		const res = await duploTesting
			.testRoute(PUT("PUT", "/organization/1234/product-sheet/1234"))
			.setRequestProperties({
				params: {
					organizationId: "1234",
					productSheetId: "1234"
				},
				body: {
					name: "test",
					description: "test",
					shortDescription: "test",
					price: 10
				}
			})
			.mockChecker(
				"organizationExist",
				{ info: "organization.exist", data: { id: "1234" } },
			)
			.mockChecker(
				"productSheetExist",
				{ info: "product_sheet.exist", data: { id: "1234" } },
			)
			.launch();

		expect(spy).lastCalledWith({
			where: {
				id: "1234"
			},
			data: {
				description: "test",
				name: "test",
				shortDescription: "test",
				price: 10
			}
		});
		expect(res.information).toBe("product_sheet.edited");
	});
});
