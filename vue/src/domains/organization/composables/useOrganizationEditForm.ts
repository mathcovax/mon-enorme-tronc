export interface ItemImage {
	blob?: Blob
	url: string | null
}

export function useOrganizationEditForm(organizationId: string) {
	const $pt = usePageTranslate();
	const { Form, checkForm, resetForm, values } = useFormBuilder({
		label: {
			type: "text",
			label: $t("label.organizationLabel"),
			zodSchema: zod.string()
		},
		logo: {
			type: "custom",
			label: $pt("form.logo"),
			defaultValue: {} as (ItemImage),
		}
	});

	duploTo.enriched
		.get("/organization/{organizationId}",
			{ params: { organizationId } }
		)
		.info("organization.found", (data) => {
			values.label.value = data.label;
			values.logo.value = { url: data.logoUrl };
		});

	return {
		FormOrganizationEdit: Form,
		checkFormOrganizationEdit: checkForm,
		resetFormOrganizationEdit: resetForm,
		valuesFormOrganziationEdit: values,
	};
}
