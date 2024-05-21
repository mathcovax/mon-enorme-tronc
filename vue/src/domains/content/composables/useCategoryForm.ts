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
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.min(3, { message: $t("form.rule.minLength", { value: 3 }) })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
		},
		disabled: {
			type: "checkbox",
			defaultValue: true as boolean,
			desc: $pt("form.disabled.desc"),
			zodSchema: zod.boolean()
		}
	});

	return {
		CategoryForm: Form,
		checkCategoryForm: checkForm,
		resetCategoryForm: resetForm, 
		valuesCategoryForm: values,
	};
}
