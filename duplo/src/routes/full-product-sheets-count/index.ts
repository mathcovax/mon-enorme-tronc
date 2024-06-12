import { fullProductSheetModel } from "@mongoose/model";
import { FilterService } from "@services/filter";

/* METHOD : GET, PATH : /full-product-sheets-count */
export const GET = (method: Methods, path: string) => 
	duplo
		.declareRoute(method, path)
		.extract({
			query: zod.object({
				categoryName: zod.string().optional()
			})
				.and(FilterService.filtersQuerySchema)
				.default({})
		})
		.handler(
			async ({ pickup }) => {
				const { categoryName, ...query } = pickup("query");
				const pipelinesStages = FilterService.makePipelinesStage(query);

				const [result] = await fullProductSheetModel.aggregate<{count?: number} | undefined>([
					...(categoryName ? [{ $match: { categories: categoryName } }] : []),
					...pipelinesStages,
					{ $count: "count" }
				]);

				if (!result || !result.count) {
					throw new Error("Missign count");
				}

				throw new OkHttpException("fullProductSheetCount", result.count.toString());
			},
			new IHaveSentThis(OkHttpException.code, "fullProductSheetCount", zod.string())
		);
