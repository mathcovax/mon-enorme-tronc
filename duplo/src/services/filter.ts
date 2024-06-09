import ZodAccelerator from "@duplojs/zod-accelerator";
import { contract } from "@utils/contract";
import { zodToArray } from "@utils/zod";
import { FilterQuery, PipelineStage } from "mongoose";

export class FilterService {
	static makePipelinesStage(
		filtersValues: Zod.infer<typeof FilterService.filtersQuerySchema>
	): PipelineStage[]
	{
		return filterDefs.map<PipelineStage | null>(
			(filterDef) => {
				const filterValue = filtersValues[filterDef.name];

				if (filterDef.type === "checkbox") {
					const result = FilterService.filtersValueSchema[filterDef.type]
						.accelerator?.safeParse(filterValue);

					if (result?.success) {
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
					const result = FilterService.filtersValueSchema[filterDef.type]
						.accelerator?.safeParse(filterValue);

					if (result?.success) {
						return {
							$match: {
								[filterDef.path]: { $regex: new RegExp(result.data, "i") }
							},
						};
					}
				}
				else if (filterDef.type === "toggle") {
					const result = FilterService.filtersValueSchema[filterDef.type]
						.accelerator?.safeParse(filterValue);

					if (result?.success) {
						return {
							$match: { [filterDef.path]: result.data }
						};
					}
				}
				else if (filterDef.type === "range") {
					const result = FilterService.filtersValueSchema[filterDef.type]
						.accelerator?.safeParse(filterValue);

					if (result?.success) {
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
					const result = FilterService.filtersValueSchema[filterDef.type]
						.accelerator?.safeParse(filterValue);
						
					if (result?.success) {
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
	}

	static get filtersQuerySchema() {
		return zod.object(
			filterDefs.reduce(
				(pv, cv) => ({ 
					...pv, 
					[cv.name]: FilterService.filtersValueSchema[cv.type].optional() 
				}),
				{} as {
					[F in typeof filterDefs[number] as F["name"]]: 
						Zod.ZodOptional<typeof FilterService["filtersValueSchema"][F["type"]]>
				}
			)
		);
	}

	static filtersValueSchema = contract<{[P in FilterDef["type"]]: Zod.ZodType}>()({
		checkbox: zodToArray(zod.string()),
		radio: zod.string(),
		toggle: zod.enum(["true", "false"]),
		range: zod.tuple([zod.coerce.number(), zod.coerce.number()]),
		"full-text": zod.string(),
	});

	static {
		Object.values(FilterService.filtersValueSchema).forEach(
			zodSchema => ZodAccelerator.build(zodSchema)
		);
	}
}
