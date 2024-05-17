import {
	inputOrganization,
	organizationExistCheck,
} from "@checkers/organization";
import { mustBeConnected } from "@security/mustBeConnected";
import { productSheetSchema } from "@schemas/product_sheet";

/* METHOD : POST, PATH : /organization/{organizationId}/product-sheet */
export const POST = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				organizationId: zod.string(),
			},
			body: zod
				.object({
					name: zod.string(),
					description: zod.string(),
					shortDescription: zod.string(),
					price: zod.number().min(0),
				})
				.passthrough(),
		})
		.check(
			organizationExistCheck,
			{
				input: (p) => inputOrganization.id(p("organizationId")),
				...organizationExistCheck.preCompletions.wantExist,
				indexing: undefined,
				result: "organization.exist",
			},
			new IHaveSentThis(NotFoundHttpException.code, "organization.notfound")
		)
		.handler(async ({ pickup }) => {
			const { name, description, shortDescription, price } = pickup("body");
			const organizationId = pickup("organizationId");

			const productSheet = await prisma.product_sheet.create({
				data: {
					name: name,
					description: description,
					shortDescription: shortDescription,
					price: price,
					organizationId: organizationId,
				},
			});

			throw new OkHttpException("product_sheet.created", productSheet);
		}, new IHaveSentThis(OkHttpException.code, "product_sheet.created", productSheetSchema));
