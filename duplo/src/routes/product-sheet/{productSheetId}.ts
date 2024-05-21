import { hasOrganizationRole } from "@security/hasOrganizationRole";
import {
	productSheetExistCheck,
	inputProductSheet,
} from "@checkers/productSheet";
import { mustBeConnected } from "@security/mustBeConnected";
import { productSheetSchema } from "@schemas/productSheet";

/* METHOD : PATCH, PATH : /product-sheet/{productSheetId} */
export const PATCH = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				productSheetId: zod.string(),
			},
			body: zod.object({
				name: zod.string().optional(),
				description: zod.string().optional(),
				shortDescription: zod.string().optional(),
				price: zod.number().min(0).optional(),
			}).passthrough().default({}),
		})
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("productSheetId")),
				...productSheetExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "productSheet.notfound")
		)
		.process(
			hasOrganizationRole,
			{
				input: p => ({
					organizationId: p("productSheet").organizationId,
					userId: p("accessTokenContent").id
				}),
				options: { organizationRole: "PRODUCT_SHEET_MANAGER" }
			}
		)
		.handler(
			async ({ pickup }) => {
				const { name, description, shortDescription, price } = pickup("body");
				const { id } = await prisma.product_sheet.update({
					where: {
						id: pickup("productSheetId"),
					},
					data: {
						name,
						description,
						shortDescription,
						price,
					},
				});
				throw new CreatedHttpException("productSheet.edited", id);
			},
			new IHaveSentThis(CreatedHttpException.code, "productSheet.edited", zod.string())
		);

/* METHOD : GET, PATH : /product-sheet/{productSheetId} */
export const GET = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				productSheetId: zod.string(),
			}
		})
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("productSheetId")),
				...productSheetExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "productSheet.notfound")
		)
		.process(
			hasOrganizationRole,
			{
				input: p => ({
					organizationId: p("productSheet").organizationId,
					userId: p("accessTokenContent").id
				}),
				options: { organizationRole: "PRODUCT_SHEET_MANAGER" }
			}
		)
		.handler(
			async ({ pickup }) => {
				throw new OkHttpException("productSheet.found", pickup("productSheet"));
			},
			new IHaveSentThis(OkHttpException.code, "productSheet.found", productSheetSchema)
		);

