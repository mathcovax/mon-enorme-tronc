export function useCategoryForm(){
	const { Form, checkForm, values, resetForm } = useFormBuilder({
		oldName: {
			type: "custom",
			defaultValue: ""
		},
		name: {
			type: "text",
			label: $t("page.manageCategories.form.name.label"),
			zodSchema: zod.string({ message: $t("page.manageCategories.form.required") })
				.min(3, { message: $t("page.manageCategories.form.name.minLength") })
				.max(255, { message: $t("page.manageCategories.form.name.max") })
		},
		disabled: {
			type: "checkbox",
			defaultValue: true as boolean,
			desc: $t("page.manageCategories.form.disabled.desc"),
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
