import { fullProductSheetModel } from "@mongoose/model";
import { fullProductSheetSchema } from "@schemas/fullProductSheet";
import { FilterService } from "@services/filter";

/* METHOD : GET, PATH : /full-product-sheets */
export const GET = (method: Methods, path: string) => 
	duplo
		.declareRoute(method, path)
		.extract({
			query: zod.object({
				page: zod.coerce.number().default(0),
				take: zod.coerce.number().min(1).max(50).default(50),
			})
				.and(FilterService.filtersQuerySchema)
				.default({})
		})
		.handler(
			async ({ pickup }) => {
				const { page, take, ...filtersValue } = pickup("query");
				const filters = FilterService.makePipelinesStage(filtersValue);

				const fullProductSheets = await fullProductSheetModel.aggregate([
					...filters,
					{ $skip: page * take },
					{ $limit: take },
				]);

				throw new OkHttpException("fullProductSheets", fullProductSheets);
			},
			new IHaveSentThis(OkHttpException.code, "fullProductSheets", fullProductSheetSchema.array())
		);
