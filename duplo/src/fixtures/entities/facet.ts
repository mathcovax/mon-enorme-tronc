import { facet_type } from "@prisma/client";
import { prisma } from "../prismaClient";

export const facetType = Object.values(facet_type);

export const makeFacet = (productSheetId: string, type: facet_type, value: string) => 
	prisma.facet.create({
		data: {
			type,
			productSheetId,
			value
		}
	});
