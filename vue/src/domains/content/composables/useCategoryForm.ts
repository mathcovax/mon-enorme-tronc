export interface ItemImage {
	blob?: Blob
	url: string
}

export function useCategoryForm() {
	const $pt = usePageTranslate(); 

	const { Form, checkForm, values, resetForm } = useFormBuilder({
		oldName: {
			type: "custom",
			defaultValue: ""
		},
		name: {
			type: "text",
			label: $pt("form.name.label"),
			cols: 6,
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.min(3, { message: $t("form.rule.minLength", { value: 3 }) })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
		},
		image: {
			label: $t("label.image"),
			type: "custom",
			defaultValue: undefined as undefined | ItemImage,
			cols: 6,
			zodSchema: zod.object(
				{
					blob: zod.instanceof(Blob)
						.refine((blob) => blob.size <= 5000000, { message: $t("form.rule.blobToLarge", { value: "5 Mo" }) })
						.optional()
				}, 
				{ message: $t("form.rule.required") }
			)
		},
		disabled: {
			type: "checkbox",
			defaultValue: true as boolean,
			desc: $pt("form.disabled.desc"),
			zodSchema: zod.boolean()
		},
	});

	return {
		CategoryForm: Form,
		checkCategoryForm: checkForm,
		resetCategoryForm: resetForm, 
		valuesCategoryForm: values,
	};
}
