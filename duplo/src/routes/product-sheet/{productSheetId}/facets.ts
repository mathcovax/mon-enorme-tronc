import { facetSchema, facetTypeTuple } from "@schemas/facet";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

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

				throw new OkHttpException("facets", facets);
			},
			new IHaveSentThis(OkHttpException.code, "facets", facetSchema.array())
		);
