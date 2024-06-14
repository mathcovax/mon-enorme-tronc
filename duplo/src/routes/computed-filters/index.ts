import { fullProductSheetModel } from "@mongoose/model";
import { DeepFilter, RangeFilterSchema, SimpleFilter, filterSchema } from "@schemas/filter";
import { FilterService } from "@services/filter";
import { SearchService } from "@services/search";
import { productSheetsQuantityComputedPiplineStageByFiltersDefs } from "@utils/mongoose/productSheetsQuantityComputedPiplineStageByFiltersDefs";

/* METHOD : GET, PATH : /computed-filters */
export const GET = async (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.extract({
		query: zod.object({})
			.and(FilterService.filtersQuerySchema)
			.and(SearchService.searchQuerySchema)
			.default({})
	})
	.handler(
		async ({ pickup }) => {
			const { categoryName, search, searchByRegex, ...filtersValue } = pickup("query");
			const pipelinesStages = FilterService.makePipelinesStage(filtersValue);
			const searchs = SearchService.makePipelinesStage({ categoryName, search, searchByRegex });

			const filters = await fullProductSheetModel.aggregate([
				...searchs,
				...pipelinesStages,
				...productSheetsQuantityComputedPiplineStageByFiltersDefs
			]).then(([quantitys]: Record<string, number>[]) => {
				if (!quantitys) {
					throw new Error("Missing quantitys.");
				}

				return Object.entries(quantitys).reduce<Record<string, number | Record<string, number>>>(
					(pv, [key, value]) => {
						if (value === null) {
							return pv;
						}
						
						const [first, second] = key.split("\\");
						if (!second) {
							pv[first] = value;
						}
						else {
							if (!pv[first]) {
								pv[first] = {};
							}

							const valueFirst = pv[first];
							
							if (typeof valueFirst === "object") {
								pv[first] = {
									...valueFirst,
									[second]: value
								};
							}
						}
						return pv;
					},
					{}
				);
			}).then(
				quantitysByFilter => filterDefs.map<DeepFilter | SimpleFilter | RangeFilterSchema | null>(filterDef => {
					const filterQuantity = quantitysByFilter[filterDef.name];
					if (
						(
							filterDef.type === "CHECKBOX" || 
							filterDef.type === "RADIO"
						) &&
						typeof filterQuantity === "object"
					) {
						return {
							type: filterDef.type,
							name: filterDef.name,
							values: filterDef.values.map(value => ({
								value, 
								quantity: filterQuantity[value]
							}))
						};
					}
					else if (
						(
							filterDef.type === "TOGGLE"
						) &&
						typeof filterQuantity === "number"
					) {
						return {
							type: filterDef.type,
							name: filterDef.name,
							quantity: filterQuantity
						};
					}
					else if (
						filterDef.type === "RANGE" && 
						typeof filterQuantity === "object" &&
						filterQuantity.min !== undefined &&
						filterQuantity.max !== undefined
					) {
						return {
							type: filterDef.type,
							name: filterDef.name,
							min: filterQuantity.min,
							max: filterQuantity.max,
						};
					}

					return null;
				}).filter((filter): filter is DeepFilter | SimpleFilter | RangeFilterSchema => !!filter)
			);

			throw new OkHttpException("filters", filters);
		},
		new IHaveSentThis(OkHttpException.code, "filters", filterSchema.array())
	);
