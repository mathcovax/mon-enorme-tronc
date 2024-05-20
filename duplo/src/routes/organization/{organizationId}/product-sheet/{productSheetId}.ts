import {
	inputOrganization,
	organizationExistCheck,
} from "@checkers/organization";
import {
	productSheetExistCheck,
	inputProductSheet,
} from "@checkers/product_sheet";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : PUT, PATH : /organization/{organizationId}/product-sheet/{productSheetId} */
export const PUT = (method: Methods, path: string) =>
	mustBeConnected()
		.declareRoute(method, path)
		.extract({
			params: {
				organizationId: zod.string(),
				productSheetId: zod.string(),
			},
			body: zod.object({
				name: zod.string(),
				description: zod.string(),
				shortDescription: zod.string(),
				price: zod.number().min(0),
			}).passthrough(),
		})
		.check(
			organizationExistCheck,
			{
				input: (p) => inputOrganization.id(p("organizationId")),
				...organizationExistCheck.preCompletions.wantExist,
				indexing: undefined,
			},
			new IHaveSentThis(NotFoundHttpException.code, "organization.notfound")
		)
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("productSheetId")),
				result: "product_sheet.exist",
				catch: () => {
					throw new NotFoundHttpException("product_sheet.notfound");
				},
				indexing: "product_sheet"
			},
			new IHaveSentThis(NotFoundHttpException.code, "product_sheet.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const { name, description, shortDescription, price } = pickup("body");
				const productSheet = await prisma.product_sheet.update({
					where: {
						id: pickup("productSheetId"),
					},
					data: {
						name: name,
						description: description,
						shortDescription: shortDescription,
						price: price,
					},
				});
				throw new CreatedHttpException("product_sheet.edited", productSheet.id);
			},
			new IHaveSentThis(CreatedHttpException.code, "product_sheet.edited", zod.string())
		);
