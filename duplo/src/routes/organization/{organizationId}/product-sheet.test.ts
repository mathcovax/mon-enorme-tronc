import { MockPrisma } from "@test/mocks/providers";
import { POST } from "./product-sheet";
import { duploTesting } from "@test/setup";

describe("POST /organization/{organizationId}/product-sheet", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("post product sheet created", async () => {
		const spy = vi.fn(() => undefined);
		MockPrisma.set("product_sheet", "create", spy);

		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setRequestProperties({
				params: {
					organizationId: ""
				},
				body: {
					name: "",
					description: "",
					short_description: "",
					price: 0,
					categoryId: ""
				}
			})
			.mockChecker(
				0,
				{
					info: "organization.exist",
					data: null
				}
			)
			.mockChecker(
				"categoryExist",
				{ info: "category.exist", data: { id: "1234", name: "test" } },
				{ passCatch: true }
			)
			.launch();
		expect(spy).lastCalledWith({
			data: {
				name: "",
				description: "",
				short_description: "",
				price: 0,
				organization: {
					connect: {
						id: ""
					}
				}
			}
		});
		expect(res.information).toBe("product_sheet.created");
	});

	it("post product sheet error creation category", async () => {
		const spy = vi.fn(() => undefined);
		MockPrisma.set("product_sheet", "create", spy);

		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setRequestProperties({
				params: {
					organizationId: ""
				},
				body: {
					name: "",
					description: "",
					short_description: "",
					price: 0,
					categoryId: ""
				}
			})
			.mockChecker(
				0,
				{
					info: "organization.exist",
					data: null
				}
			)
			.mockChecker(
				"categoryExist",
				{ info: "category.notfound", data: { id: "1234", name: "test" } },
				{ passCatch: true }
			)
			.launch();
		expect(res.information).toBe("category.notfound");
	});

	it("post product sheet error creation organization", async () => {
		const spy = vi.fn(() => undefined);
		MockPrisma.set("product_sheet", "create", spy);

		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setRequestProperties({
				params: {
					organizationId: ""
				},
				body: {
					name: "",
					description: "",
					short_description: "",
					price: 0,
					categoryId: ""
				}
			})
			.mockChecker(
				0,
				{
					info: "organization.notfound",
					data: null
				}
			)
			.mockChecker(
				"categoryExist",
				{ info: "category.notfound", data: { id: "1234", name: "test" } },
				{ passCatch: true }
			)
			.launch();
		expect(res.information).toBe("organization.notfound");
	});
});
