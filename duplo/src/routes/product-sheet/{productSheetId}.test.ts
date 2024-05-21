import { MockPrisma } from "@test/mocks/providers";
import { PATCH, GET } from "./{productSheetId}";
import { duploTesting } from "@test/setup";
import { productSheetData } from "@test/data/productSheet";

describe("PATCH /product-sheet/{productSheetId}", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("update porduct sheet", async () => {
		const spy = vi.fn(() => productSheetData);
		MockPrisma.set("product_sheet", "update", spy);

		const res = await duploTesting
			.testRoute(PATCH("PATCH", "/product-sheet/1234"))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					productSheetId: "1234"
				},
				body: {
					name: "test",
					description: "la grosse tete de mathieu",
					shortDescription: "la grosse tete de mathieu",
					price: 10
				}
			})
			.mockChecker(
				"productSheetExist",
				{ info: "productSheet.exist", data: { id: "1234" } }
			)
			.mockProcess(
				"hasOrganizationRole",
				{ }
			)
			.launch();

		expect(res.information).toBe("productSheet.edited");
		expect(spy).lastCalledWith({
			where: {
				id: "1234"
			},
			data: {
				name: "test",
				description: "la grosse tete de mathieu",
				shortDescription: "la grosse tete de mathieu",
				price: 10
			},
		});
	});

	it("product sheet notfound", async () => {
		const res = await duploTesting
			.testRoute(PATCH("PATCH", "/product-sheet/1234"))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					productSheetId: "1234"
				},
				body: {
					name: "test",
					description: "la grosse tete de mathieu",
					shortDescription: "la grosse tete de mathieu",
					price: 10
				}
			})
			.mockChecker(
				"productSheetExist",
				{ info: "productSheet.notfound", data: { id: "1234" } }
			)
			.launch();

		expect(res.information).toBe("productSheet.notfound");
	});
});

describe("GET /product-sheet/{productSheetId}", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("get product sheet by id", async () => {
		const res = await duploTesting
			.testRoute(GET("GET", "/product-sheet/1234"))
			.setDefaultFloorValue({ accessTokenContent: {} })
			.setRequestProperties({
				params: {
					productSheetId: "1234"
				},
			})
			.mockChecker(
				"productSheetExist",
				{ info: "productSheet.exist", data: productSheetData }
			)
			.mockProcess(
				"hasOrganizationRole",
				{  }
			)
			.launch();

		expect(res.information).toBe("productSheet.found");
	});
});
