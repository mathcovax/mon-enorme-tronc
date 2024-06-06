import { fullProductSheetModel } from "@mongoose/model";
import { fullProductSheetSchema } from "@schemas/fullProductSheet";

/* METHOD : GET, PATH : /full-product-sheet/{id} */
export const GET = (method: Methods, path: string) => 
	duplo
		.declareRoute(method, path)
		.extract({
			params: {
				id: zod.string()
			}
		})
		.cut(
			async ({ pickup }) => {
				const fullProductSheetId = pickup("id");
				const fullProductSheet = await fullProductSheetModel.findOne({ id: fullProductSheetId });

				if (!fullProductSheet) {
					throw new NotFoundHttpException("fullProductSheet.notfound");
				}

				return {
					fullProductSheet
				};
			},
			["fullProductSheet"],
			new IHaveSentThis(NotFoundHttpException.code, "fullProductSheet.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const fullProductSheet = pickup("fullProductSheet");

				throw new OkHttpException("fullProductSheet", fullProductSheet);
			},
			new IHaveSentThis(OkHttpException.code, "fullProductSheet", fullProductSheetSchema)
		);
