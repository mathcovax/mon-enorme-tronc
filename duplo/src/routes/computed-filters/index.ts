import { fullProductSheetModel } from "@mongoose/model";
import { DeepFilter, RangeFilterSchema, SimpleFilter, filterSchema } from "@schemas/filter";
import { FilterService } from "@services/filter";
import { PipelineStage } from "mongoose";

/* METHOD : GET, PATH : /computed-filters */
export const GET = async (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.extract({
		query: zod.object({
			categoryName: zod.string().optional()
		})
			.and(FilterService.filtersQuerySchema)
			.default({})
	})
	.cut(
		({ pickup }) => {
			const { price } = pickup("query");
			const { $group, $project, $densify } = filterDefs.reduce<
				PipelineStage.Project 
				& PipelineStage.Group 
				& PipelineStage.Densify
			>(
				(pv, filterDef) => {
					if (filterDef.type === "CHECKBOX" || filterDef.type === "RADIO") {
						filterDef.values.forEach(value => {
							pv.$project[`${filterDef.name}.${value}`] = {
								$cond: {
									if: {
										$regexMatch: { 
											input: `$${filterDef.path}`, 
											regex: new RegExp(value, "i")
										}
									},
									then: 1,
									else: 0
								}
							};
	
							pv.$group = {
								...pv.$group,
								[`${filterDef.name}\\${value}`]: { $sum: `$${filterDef.name}.${value}` }
							};
						});
					}
					else if (filterDef.type === "RANGE") {
						pv.$project[`${filterDef.name}.quantity`] = {
							$cond: {
								if: price 
									? {
										$gte: [`$${filterDef.path}`, price[0]],
										$lte: [`$${filterDef.path}`, price[1]]
									}
									: { $gte: [`$${filterDef.path}`, 0] },
								then: 1,
								else: 0
							}
						};

						pv.$project[`${filterDef.name}.price`] = "$price";
	
						pv.$group = {
							...pv.$group,
							[`${filterDef.name}\\quantity`]: { $sum: `$${filterDef.name}` },
							[`${filterDef.name}\\max`]: { $max: `$${filterDef.name}.price` },
							[`${filterDef.name}\\min`]: { $min: `$${filterDef.name}.price` },
						};
					}
					else if (filterDef.type === "TOGGLE") {
						pv.$project[`${filterDef.name}`] = {
							$cond: {
								if: {
									$eq: [`$${filterDef.path}`, "true"]
								},
								then: 1,
								else: 0
							}
						};

						pv.$group = {
							...pv.$group,
							[`${filterDef.name}`]: { $sum: `$${filterDef.name}` }
						};
					}
					else if (filterDef.type === "FULL-TEXT") {
						pv.$project[`${filterDef.name}`] = {
							$cond: {
								if: {
									$not: {
										$eq: ["$default", 1]
									},
								},
								then: 1,
								else: 0
							}
						};

						pv.$group = {
							...pv.$group,
							[`${filterDef.name}`]: { $sum: `$${filterDef.name}` }
						};
					}
	
					return pv;
				},
				{
					$project: {},
					$group: { _id: null },
					$densify: {
						field: "default",
						range: {
							step: 1,
							bounds: [1, 1]
						}
					},

				}
			);
			
			return {
				quantityFiltersPipelineStage: [{ $densify }, { $project }, { $group }]
			};
		},
		["quantityFiltersPipelineStage"]
	)
	.handler(
		async ({ pickup }) => {
			const { categoryName, ...query } = pickup("query");
			const pipelinesStages = FilterService.makePipelinesStage(query);
			const quantityFiltersPipelineStage = pickup("quantityFiltersPipelineStage");

			const filters = await fullProductSheetModel.aggregate([
				...(categoryName ? [{ $match: { categories: categoryName } }] : []),
				...pipelinesStages,
				...quantityFiltersPipelineStage
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
							filterDef.type === "FULL-TEXT" ||
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
						filterQuantity.quantity !== undefined &&
						filterQuantity.min !== undefined &&
						filterQuantity.max !== undefined
					) {
						return {
							type: filterDef.type,
							name: filterDef.name,
							quantity: filterQuantity.quantity,
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
