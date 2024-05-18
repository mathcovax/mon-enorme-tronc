import type { ItemComboBox } from "@/composables/useFormBuilder/_inputs/ComboBoxInput";

export function useCreateProductSheetForm() {
	const suggestedCategory = ref<ItemComboBox[]>([]);
	
	function onSearchCategory(categoryName: string) {
		duploTo.enriched.
			get("/categories", { query: { name: categoryName } })
			.s((categories) => {
				suggestedCategory.value = categories.map(
					(category) => ({ label: category.name, identifier: category.id })
				);
			});
	}

	const { Form, checkForm, resetForm } = useFormBuilder({
		name: {
			type: "text",
			label: $t("page.createProductSheet.form.name.label"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("page.createProductSheet.form.required") })
				.max(255, { message: $t("page.createProductSheet.form.name.maxLength") })
				.min(2, { message: $t("page.createProductSheet.form.name.minLength") })
		},
		description: {
			type: "textarea",
			label: $t("page.createProductSheet.form.description.label"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("page.createProductSheet.form.required") })
				.min(2, { message: $t("page.createProductSheet.form.description.minLength") })
		},
		shortDescription: {
			type: "text",
			label: $t("page.createProductSheet.form.shortDescription.label"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("page.createProductSheet.form.required") })
				.max(255, { message: $t("page.createProductSheet.form.shortDescription.maxLength") })
				.min(2, { message: $t("page.createProductSheet.form.shortDescription.minLength") })
		},
		price: {
			type: "number",
			label: $t("page.createProductSheet.form.price.label"),
			defaultValue: 0,
			zodSchema: zod.number({ message: $t("page.createProductSheet.form.required") })
				.min(0, { message: $t("page.createProductSheet.form.price.min") })
		},
		categoryId: computed(() => ({
			type: "combo",
			label: $t("page.createProductSheet.form.category.label"),
			textButton: $t("page.createProductSheet.form.category.textButton"),
			placeholder: $t("page.createProductSheet.form.category.placeholder"),
			emptyLabel: $t("page.createProductSheet.form.category.emptyLabel"),
			items: suggestedCategory.value,
			onUpdateSearchTerm: onSearchCategory,
			zodSchema: zod.object(
				{ identifier: zod.string() },
				{ message: $t("page.createProductSheet.form.required") }
			).transform(item => item.identifier),
		})),
	});
	return {
		CreateProductSheetForm: Form,
		checkCreateProductSheetForm: checkForm,
		resetCreateProductSheetForm: resetForm,
	};
}
