import { fullProductSheetModel } from "@mongoose/model";
import { fullProductSheetSchema } from "@schemas/fullProductSheet";

/* METHOD : GET, PATH : /full-product-sheets */
export const GET = (method: Methods, path: string) => 
	duplo
		.declareRoute(method, path)
		.extract({
			query: zod.object({
				page: zod.coerce.number().default(0)
			}).strip().default({})
		})
		.handler(
			async ({ pickup }) => {
				const { page } = pickup("query");

				const fullProductSheets = await fullProductSheetModel.aggregate([
					{ $skip: page*50 },
					{ $limit: 50 }
				]);

				throw new OkHttpException("fullProductSheets", fullProductSheets);
			},
			new IHaveSentThis(OkHttpException.code, "fullProductSheets", fullProductSheetSchema.array())
		);
