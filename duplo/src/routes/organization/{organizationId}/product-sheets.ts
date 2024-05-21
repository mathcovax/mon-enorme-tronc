import { inputOrganization, organizationExistCheck } from "@checkers/organization";
import { productSheetSchema } from "@schemas/productSheet";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : GET, PATH : /organization/{organizationId}/product-sheets */
export const GET = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				organizationId: zod.string()
			},
			query: {
				page: zod.coerce.number().default(0),
				name: zod.string().optional()
			}
		})
		.check(
			organizationExistCheck,
			{
				input: p => inputOrganization.id(
					p("organizationId")
				),
				...organizationExistCheck.preCompletions.wantExist,
				indexing: undefined
			},
			new IHaveSentThis(NotFoundHttpException.code, "organization.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const organizationId = pickup("organizationId");
				const page = pickup("page");
				const name = pickup("name");

				const productSheets = await prisma.product_sheet.findMany({
					where: {
						organizationId: organizationId,
						name: name
							? {
								contains: name,
								mode: "insensitive"
							}
							: undefined
					},
					take: 10,
					skip: page * 10
				});

				throw new OkHttpException("product_sheets.found", productSheets);
			},
			new IHaveSentThis(OkHttpException.code, "product_sheets.found", productSheetSchema.array())
		);
