import { categoryExistCheck } from "@checkers/category";
import { fullProductSheetModel } from "@mongoose/model";
import { fullProductSheetSchema } from "@schemas/fullProductSheet";
import { FilterService } from "@services/filter";

/* METHOD : GET, PATH : /category/{categoryName}/full-product-sheets */
export const GET = (method: Methods, path: string) => 
	duplo
		.declareRoute(method, path)
		.extract({
			params: {
				categoryName: zod.string()
			},
			query: zod.object({
				page: zod.coerce.number().default(0),
				take: zod.coerce.number().min(1).max(50).default(50),
			})
				.and(FilterService.filtersQuerySchema)
				.default({})
		})
		.check(
			categoryExistCheck,
			{
				input: p => p("categoryName"),
				...categoryExistCheck.preCompletions.mustExist,
			},
			new IHaveSentThis(NotFoundHttpException.code, "category.notfound")
		)
		.cut(
			({ pickup }) => {
				const category = pickup("category");

				if (category.disabled) {
					throw new ForbiddenHttpException("category.disabled");
				}

				return {};
			},
			[],
			new IHaveSentThis(ForbiddenHttpException.code, "category.disabled")
		)
		.handler(
			async ({ pickup }) => {
				const { name: categoryName } = pickup("category");
				const { page, take, ...filtersValue } = pickup("query");
				const filters = FilterService.makePipelinesStage(filtersValue);
		
				const fullProductSheets = await fullProductSheetModel.aggregate([
					{ $match: { categories: categoryName } },
					...filters,
					{ $skip: page * take },
					{ $limit: take },
				]);
		
				throw new OkHttpException("fullProductSheets", fullProductSheets);
			},
			new IHaveSentThis(OkHttpException.code, "fullProductSheets", fullProductSheetSchema.array())
		);
