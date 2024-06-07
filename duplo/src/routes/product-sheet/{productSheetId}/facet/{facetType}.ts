import { facetExistCheck } from "@checkers/facet";
import { facetTypeSchema } from "@schemas/facet";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

/* METHOD : DELETE, PATH : /product-sheet/{productSheetId}/facet/{facetType} */
export const DELETE = (method: Methods, path: string) => 
	hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"] })
		.declareRoute(method, path)
		.extract({
			params: {
				facetType: facetTypeSchema
			}
		})
		.check(
			facetExistCheck,
			{
				input: p => ({ type: p("facetType"), productSheetId: p("productSheet").id }),
				...facetExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "facet.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const { type } = pickup("facet");
				const { id: productSheetId } = pickup("productSheet");
				
				await prisma.facet.delete({
					where: {
						type_productSheetId: {
							type,
							productSheetId
						}
					}
				});

				throw new NoContentHttpException("facet.deleted");
			},
			new IHaveSentThis(NoContentHttpException.code, "facet.deleted")
		);

/* METHOD : PATCH, PATH : /product-sheet/{productSheetId}/facet/{facetType} */
export const PATCH = (method: Methods, path: string) =>
	hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"] })
		.declareRoute(method, path)
		.extract({
			params: {
				facetType: facetTypeSchema
			},
			body: zod.object({
				value: zod.string().min(2).max(50).optional()
			}).strip().default({})
		})
		.check(
			facetExistCheck,
			{
				input: p => ({ type: p("facetType"), productSheetId: p("productSheet").id }),
				...facetExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "facet.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const { type } = pickup("facet");
				const { id: productSheetId } = pickup("productSheet");
				const { value } = pickup("body");
				
				await prisma.facet.update({
					where: {
						type_productSheetId: {
							type,
							productSheetId
						}
					},
					data: {
						value
					}
				});

				throw new NoContentHttpException("facet.edited");
			},
			new IHaveSentThis(NoContentHttpException.code, "facet.edited")
		);

