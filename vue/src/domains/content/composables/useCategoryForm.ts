export function useCategoryForm(){
	const { Form, checkForm, values, resetForm } = useFormBuilder({
		name: {
			type: "text",
			label: $t("page.manageCategories.form.name.label"),
			zodSchema: zod.string()
				.min(3, { message: $t("page.manageCategories.form.name.minLength") })
				.max(255, { message: $t("page.manageCategories.form.name.max") })
		},
		disabled: {
			type: "checkbox",
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
