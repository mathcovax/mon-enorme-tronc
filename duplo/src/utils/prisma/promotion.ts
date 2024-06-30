import { Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import { PromotionSchema } from "@schemas/promotion";
import { contract } from "@utils/contract";

export const promotionInclude = contract<Prisma.promotionFindFirstArgs["include"]>()({
	productSheet: {
		select: {
			name: true
		}
	}
});

export const promotionEntityformater = 
	(
		{ productSheet, startDate, endDate, ...promotionEntity }: 
			GetResult<Prisma.$promotionPayload, {include: typeof promotionInclude}>
	): PromotionSchema => ({
		...promotionEntity,
		startDate: startDate.toISOString(),
		endDate: endDate.toISOString(),
		productSheetName: productSheet.name,
	});
