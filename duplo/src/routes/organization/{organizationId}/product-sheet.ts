import { inputOrganization, organizationExistCheck } from "@checkers/organization";
import { categoryExistCheck, inputCategory } from "@checkers/category";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : POST, PATH : /organization/{organizationId}/product-sheet */
export const POST = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				organizationId: zod.string()
			},
			body: zod.object({
				name: zod.string(),
				description: zod.string(),
				short_description: zod.string(),
				price: zod.number().min(0),
				categoryId: zod.string(),
			}).passthrough()
		})
		.check(
			categoryExistCheck,
			{
				input: (p) => inputCategory.id(
					p("body").categoryId
				),
				result: "category.exist",
				catch: () => {
					throw new NotFoundHttpException("category.notfound");
				},
				indexing: "category"

			},
			new IHaveSentThis(NotFoundHttpException.code, "category.notfound")
		)
		.check(
			organizationExistCheck,
			{
				input: p => inputOrganization.id(
					p("organizationId")
				),
				...organizationExistCheck.preCompletions.wantExist,
				indexing: undefined,
				result: "organization.exist"
			},
			new IHaveSentThis(NotFoundHttpException.code, "organization.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const { name, description, short_description, price } = pickup("body");
				const category = pickup("category");
				const organizationId = pickup("organizationId");

				const product_sheet = await prisma.product_sheet
					.create({
						data: {
							name: name,
							description: description,
							short_description: short_description,
							price: price,
							organization: {
								connect: {
									id: organizationId
								}
							}
						}
					});

				await prisma.product_sheet_to_category
					.create({
						data: {
							category: {
								connect: {
									id: category.id
								}
							},
							product_sheet: {
								connect: {
									id: product_sheet.id
								}
							}
						}
					});
				throw new OkHttpException("product_sheet.created");
			},
			new IHaveSentThis(OkHttpException.code, "product_sheet.created")
		);
