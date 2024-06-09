import { filterDefs } from "@/providers/filters";
import { filtersSchema } from "@schemas/filter";

/* METHOD : GET, PATH : /filters */
export const GET = (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.handler(
		async () => {
			const filters = filterDefs;
			throw new OkHttpException("filters.found", filters);
		},
		new IHaveSentThis(OkHttpException.code, "filters.found", filtersSchema)
	);
