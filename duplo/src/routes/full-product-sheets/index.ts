import { categoryExistCheck } from "@checkers/category";
import { fullProductSheetModel } from "@mongoose/model";
import { fullProductSheetSchema } from "@schemas/fullProductSheet";
import { FilterService } from "@services/filter";

/* METHOD : GET, PATH : /full-product-sheets */
export const GET = (method: Methods, path: string) => 
	duplo
		.declareRoute(method, path)
		.extract({
			query: zod.object({
				categoryName: zod.string().optional(),
				page: zod.coerce.number().default(1).transform(v => v < 1 ? 0 : v - 1),
				take: zod.coerce.number().min(1).max(40).default(40),
			})
				.and(FilterService.filtersQuerySchema)
				.default({})
		})
		.check(
			categoryExistCheck,
			{
				input: p => p("query").categoryName ?? "",
				...categoryExistCheck.preCompletions.mustExist,
				skip: p => p("query").categoryName == undefined,
			},
			new IHaveSentThis(NotFoundHttpException.code, "category.notfound")
		)
		.cut(
			({ pickup }) => {
				const category = pickup("category");

				if (category && category.disabled) {
					throw new ForbiddenHttpException("category.disabled");
				}

				return {};
			},
			[],
			new IHaveSentThis(ForbiddenHttpException.code, "category.disabled")
		)
		.handler(
			async ({ pickup }) => {
				const { page, take, categoryName, ...filtersValue } = pickup("query");
				const filters = FilterService.makePipelinesStage(filtersValue);
				
				const fullProductSheets = await fullProductSheetModel.aggregate([
					...(categoryName ? [{ $match: { categories: categoryName } }] : []),
					...filters,
					{ $skip: page * take },
					{ $limit: take },
				]);

				throw new OkHttpException("fullProductSheets", fullProductSheets);
			},
			new IHaveSentThis(OkHttpException.code, "fullProductSheets", fullProductSheetSchema.array())
		);
