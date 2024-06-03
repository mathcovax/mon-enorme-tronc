import { facet_type } from "@prisma/client";

interface InputFacetExist {
	type: facet_type,
	productSheetId: string
}

export const facetExistCheck = duplo
	.createChecker("facetExist")
	.handler(async(input: InputFacetExist, output) => {

		const facet = await prisma.facet.findUnique({
			where: {
				type_productSheetId: input
			}
		});

		if (!facet) {
			return output("facet.notfound", null);
		}
		else {
			return output("facet.exist", facet);
		}
	})
	.preCompletion(
		"mustExist",
		{
			result: "facet.exist",
			catch: () => {
				throw new NotFoundHttpException("facet.notfound");
			},
			indexing: "facet",
		}
	)
	.build();
