import { filtersSchema } from "@schemas/filter";

/* METHOD : GET, PATH : /filters */
export const GET = async (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.handler(
		async () => {
			throw new OkHttpException("filters.found", filters);
		},
		new IHaveSentThis(OkHttpException.code, "filters.found", filtersSchema)
	);
