import { fullProductSheetModel } from "@mongoose/model";
import { filtersSchema } from "@schemas/filter";
import { FilterService } from "@services/filter";
import { PipelineStage } from "mongoose";

/* METHOD : GET, PATH : /computed-filters */
export const GET = async (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.extract({
		query: FilterService.filtersQuerySchema
	})
	.handler(
		async ({ pickup }) => {
			const query = pickup("query");
			const pipelinesStages = FilterService.makePipelinesStage(query, true);
			// https://stackoverflow.com/questions/30169115/group-and-count-with-condition
			const pipelinesStagesGroups = filterDefs
				.map<PipelineStage | null>((fd, index) => null
					// fd.path 
					// 	? {
					// 		$group: {
					// 			_id: null,
					// 			quantity: {
					// 				$sum: pipelinesStages[index] ?? 1
					// 			}
					// 		}
					// 	}
					// 	: null
				);

			const computedFilters = await fullProductSheetModel.aggregate([
				...pipelinesStages.filter((v): v is PipelineStage => !!v),
				...pipelinesStagesGroups.filter((v): v is PipelineStage => !!v),
				{
					$project: {
						"color.red": {  
							$cond: {
								if: {
									$regexMatch: { input: "$facets.COLOR", regex: new RegExp("red", "i") }
								},
								then: 1,
								else: 0
							}
						},
						"color.blue": {
							$cond: {
								if: {
									$regexMatch: { input: "$facets.COLOR", regex: new RegExp("blue", "i") }
								},
								then: 1,
								else: 0
							}
						}
					}
				},
				{
					$group: {
						_id: null,
						"color/red": { $sum: "$color.red" },
						"color/blue": { $sum: "$color.blue" }
					}
				}
			]);

			throw new OkHttpException("computedFilters", computedFilters);
		},
		new IHaveSentThis(OkHttpException.code, "computedFilters", zod.any())
	);
