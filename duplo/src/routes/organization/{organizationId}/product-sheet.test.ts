import { MockPrisma } from "@test/mocks/providers";
import { POST } from "./product-sheet";
import { duploTesting } from "@test/setup";

describe("POST /organization/{organizationId}/product-sheet", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("post product sheet created", async () => {
		const product_sheet = {
			id: "",
			name: "",
			description: "",
			short_description: "",
			price: 0,
			created_at: new Date(),
			pdated_at: new Date(),
			organizationId: ""
		};
		const spy = vi.fn(() => product_sheet);
		MockPrisma.set("product_sheet", "create", spy);

		const spy2 = vi.fn(() => undefined);
		MockPrisma.set("product_sheet_to_category", "create", spy2);

		const res = await duploTesting
			.testRoute(POST("POST", "/organization/1234/product-sheet"))
			.setRequestProperties({
				params: {
					organizationId: "1234"
				},
				body: {
					name: "test",
					description: "test",
					short_description: "test",
					price: 10,
					categoryId: "1234"
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
				{ info: "category.exist", data: { id: "1234" } }
			)
			.launch();

		expect(spy).lastCalledWith({
			data: {
				description: "test",
				name: "test",
				organization: {
					connect: {
						id: "1234"
					}
				},
				short_description: "test",
				price: 10,
			}
		});

		expect(spy2).lastCalledWith({
			data: {
				category: {
					connect: {
						id: "1234"
					}
				},
				product_sheet: {
					connect: {
						id: "1234"
					}
				}
			}
		});
		expect(res.information).toBe("product_sheet.created");
	});

	it("post product sheet error category notfound", async () => {
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
				{ info: "category.notfound", data: { id: "1234" } },
			)
			.launch();
		expect(res.information).toBe("category.notfound");
	});

	it("post product sheet error organization notfound", async () => {
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
				"organizationExist",
				{ info: "organization.notfound", data: { id: "1234" } },
			)
			.mockChecker(
				"categoryExist",
				{ info: "category.exist", data: { id: "1234" } }
			)
			.launch();
		expect(res.information).toBe("organization.notfound");
	});
});
