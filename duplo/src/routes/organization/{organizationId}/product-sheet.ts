import {
	inputOrganization,
	organizationExistCheck,
} from "@checkers/organization";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : POST, PATH : /organization/{organizationId}/product-sheet */
export const POST = (method: Methods, path: string) =>
	mustBeConnected()
		.declareRoute(method, path)
		.extract({
			params: {
				organizationId: zod.string(),
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
		.handler(
			async ({ pickup }) => {
				const { name, description, shortDescription, price } = pickup("body");
				const organizationId = pickup("organizationId");

				const { id: productSheetId } = await prisma.product_sheet.create({
					data: {
						name: name,
						description: description,
						shortDescription: shortDescription,
						price: price,
						organizationId: organizationId,
					},
				});

				throw new CreatedHttpException("product_sheet.created", productSheetId);
			}, 
			new IHaveSentThis(CreatedHttpException.code, "product_sheet.created", zod.string())
		);
