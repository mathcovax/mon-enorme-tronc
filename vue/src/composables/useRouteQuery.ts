import type { ZodObject, ZodTypeAny, infer as zodInfer } from "zod";

export function useRouteQuery<
	T extends Record<string, ZodTypeAny>
>(objectSchemas: T): zodInfer<ZodObject<T>>
{
	const zodSchema = zod.object(objectSchemas);

	const { query } = useRoute();
	const router = useRouter();

	const { success, data } = zodSchema.safeParse(query);

	if (!success) {
		router.push({ name: routerPageName.EDITO_HOME });
		throw new Error("Query is invalid.");
	}

	return data; 
}
