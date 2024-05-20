const organizationIdShema = zod.string();

export function useOrganizationId() {
	const { params: { organizationId: organizationIdParams } } = useRoute();
	const router = useRouter();

	const { success, data: organizationId } = organizationIdShema.safeParse(organizationIdParams);

	if (!success) {
		router.push({ name: routerPageName.EDITO_HOME });
		throw new Error("Params organizationId is invalid.");
	}

	return {
		organizationId
	};
}
