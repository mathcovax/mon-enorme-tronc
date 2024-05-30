import type { ParentCategory } from "@/lib/utils";

export function useParentCategoryForm() {
	const $pt = usePageTranslate(); 

	const {
		categories,
		getCategories
	} = useSearchCategories();

	const { Form, checkForm, values, resetForm } = useFormBuilder({
		oldParentCategory: {
			type: "custom",
			defaultValue: undefined as undefined | ParentCategory
		},
		name: {
			type: "text",
			label: $pt("label.name"),
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.min(3, { message: $t("form.rule.minLength", { value: 3 }) })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
		},
		categories: {
			type: "custom",
			label: $pt("label.linkCategories"),
			defaultValue: [] as ItemMultiComboBox[] | undefined,
			zodSchema: zod.object({
				value: zod.string()
			}).array().max(10, { message: $t("form.rule.maxItems", { value: 10 }) })
		},
	});

	return {
		ParentCategoryForm: Form,
		checkParentCategoryForm: checkForm,
		resetParentCategoryForm: resetForm, 
		valuesParentCategoryForm: values,
		suggestedCategories: computed(() => categories.value.map(c => ({ label: c.name, value: c.name }))),
		onSearchCategories: (name: string) => getCategories(0, name)
	};
}
