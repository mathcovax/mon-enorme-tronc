import type { ZodObject, ZodTypeAny, infer as zodInfer } from "zod";

export function useRouteParams<
	T extends Record<string, ZodTypeAny>
>(objectSchemas: T): zodInfer<ZodObject<T>>
{
	const zodSchema = zod.object(objectSchemas);

	const { params } = useRoute();
	const router = useRouter();

	const { success, data } = zodSchema.safeParse(params);

	if (!success) {
		router.push({ name: routerPageName.EDITO_HOME });
		throw new Error("Params is invalid.");
	}

	return data; 
}
