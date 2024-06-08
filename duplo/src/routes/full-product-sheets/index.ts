import ZodAccelerator from "@duplojs/zod-accelerator";
import { fullProductSheetModel } from "@mongoose/model";
import { fullProductSheetSchema } from "@schemas/fullProductSheet";
import { zodToArray } from "@utils/zod";
import { FilterQuery, PipelineStage } from "mongoose";

const zodStringToArray = ZodAccelerator.build(zodToArray(zod.string()));
const zodString = ZodAccelerator.build(zod.string());
const zodBooleanInString = ZodAccelerator.build(zod.enum(["true", "false"]));
const zodTupleMinMax = ZodAccelerator.build(zod.tuple([zod.coerce.number(), zod.coerce.number()]));

/* METHOD : GET, PATH : /full-product-sheets */
export const GET = (method: Methods, path: string) => 
	duplo
		.declareRoute(method, path)
		.extract({
			query: zod.object({
				page: zod.coerce.number().default(0),
				take: zod.coerce.number().min(1).max(50).default(50),
			}).strip().default({})
		})
		.cut(
			async (floor, res, request) => {
				const filters = filterDefs.map<PipelineStage | null>(
					(filterDef) => {
						const queryValue = request.query[filterDef.name];
						if (filterDef.type === "checkbox") {
							const result = zodStringToArray.safeParse(queryValue);
							if (result.success) {
								return {
									$match: {
										$or: result.data.map<FilterQuery<unknown>>(value => ({
											[filterDef.path]: { $regex: new RegExp(value, "i") }
										}))
									},
								};
							}
						}
						else if (filterDef.type === "radio") {
							const result = zodString.safeParse(queryValue);
							if (result.success) {
								return {
									$match: {
										[filterDef.path]: { $regex: new RegExp(result.data, "i") }
									},
								};
							}
						}
						else if (filterDef.type === "toggle") {
							const result = zodBooleanInString.safeParse(queryValue);
							if (result.success) {
								return {
									$match: { [filterDef.path]: result.data }
								};
							}
						}
						else if (filterDef.type === "range") {
							const result = zodTupleMinMax.safeParse(queryValue);
							if (result.success) {
								return {
									$match: {
										[filterDef.path]: {
											$gte: result.data[0],
											$lte: result.data[1]
										}
									}
								};
							}
						}
						else if (filterDef.type === "full-text") {
							const result = zodString.safeParse(queryValue);
							if (result.success) {
								return {
									$match: {
										$text: {
											$search: result.data
										}
									}
								};
							}
						}

						return null;
					}
				).filter((v): v is PipelineStage => !!v);

				return  {
					filters
				};
			},
			["filters"]
		)
		.handler(
			async ({ pickup }) => {
				const { page, take } = pickup("query");
				const filters = pickup("filters");

				const fullProductSheets = await fullProductSheetModel.aggregate([
					...filters,
					{ $skip: page * take },
					{ $limit: take },
				]);

				throw new OkHttpException("fullProductSheets", fullProductSheets);
			},
			new IHaveSentThis(OkHttpException.code, "fullProductSheets", fullProductSheetSchema.array())
		);
