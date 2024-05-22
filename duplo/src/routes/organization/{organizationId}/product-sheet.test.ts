import { MockPrisma } from "@test/mocks/providers";
import { POST } from "./product-sheet";
import { duploTesting } from "@test/setup";
import { organizationData } from "@test/data/organization";

describe("POST /organization/{organizationId}/product-sheet", () => {
	beforeEach(() => {
		MockPrisma.reset();
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
			.setDefaultFloorValue({ organization: organizationData })
			.setRequestProperties({
				body: {
					name: "test",
					description: "test",
					shortDescription: "test",
					price: 10,
				}
			})
			.launch();

		expect(spy).lastCalledWith({
			data: {
				description: "test",
				name: "test",
				organizationId: "eee",
				shortDescription: "test",
				price: 10
			}
		});
		expect(res.information).toBe("productSheet.created");
	});
});
