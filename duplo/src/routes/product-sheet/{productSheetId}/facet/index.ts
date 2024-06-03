import { facetExistCheck } from "@checkers/facet";
import { facetSchema, facetTypeSchema } from "@schemas/facet";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

export const POST = (method: Methods, path: string) => 
	hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"] })
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				type: facetTypeSchema,
				value: zod.string().max(50),
			}).strip()
		})
		.check(
			facetExistCheck,
			{
				input: p => ({ type: p("body").type, productSheetId: p("productSheet").id }),
				result: "facet.notfound",
				catch: () => {
					throw new ConflictHttpException("productSheet.facet.alreadyExist");
				}
			},
			new IHaveSentThis(ConflictHttpException.code, "productSheet.facet.alreadyExist")
		)
		.handler(
			async ({ pickup }) => {
				const { type, value } = pickup("body");
				const { id: productSheetId } = pickup("productSheet");

				const facet = await prisma.facet.create({
					data: {
						type,
						productSheetId,
						value,
					}
				});

				throw new CreatedHttpException("facet.created", facet);
			},
			new IHaveSentThis(CreatedHttpException.code, "facet.created", facetSchema)
		);
