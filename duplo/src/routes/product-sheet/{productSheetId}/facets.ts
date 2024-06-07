import { facetSchema, facetTypeTuple } from "@schemas/facet";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

/* METHOD : GET, PATH : /product-sheet/{productSheetId}/facets */
export const GET = (method: Methods, path: string) => 
	hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"] })
		.declareRoute(method, path)
		.handler(
			async ({ pickup }) => {
				const { id: productSheetId } = pickup("productSheet"); 

				const facets = await prisma.facet.findMany({
					where: {
						productSheetId
					},
					take: facetTypeTuple.length
				});

				throw new OkHttpException("productSheet.facets", facets);
			},
			new IHaveSentThis(OkHttpException.code, "productSheet.facets", facetSchema.array())
		);
