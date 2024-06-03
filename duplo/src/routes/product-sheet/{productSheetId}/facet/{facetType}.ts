import { facetExistCheck } from "@checkers/facet";
import { facetTypeSchema } from "@schemas/facet";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

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

				throw new NoContentHttpException("facet.delete");
			},
			new IHaveSentThis(NoContentHttpException.code, "facet.delete")
		);
