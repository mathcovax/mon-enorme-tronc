import { useGetProductSheets } from "./useGetProductSheets";

export function useProductForm(organizationId: string) {

	const { productSheets, getProductSheets } = useGetProductSheets(organizationId);
	const $pt = usePageTranslate();

	const { Form, checkForm, resetForm, values } = useFormBuilder({
		sku: {
			type: "text",
			label: $pt("form.sku"),
			placeholder: $pt("form.skuPlaceholder"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
				.min(2, { message: $t("form.rule.minLength", { value: 2 }) })
		},
		productSheet: computed(() => ({
			type: "combo",
			items: productSheets.value.map(v => ({ label: v.name, identifier: v.id })),
			placeholder: $pt("form.productSheetPlaceholder"),
			emptyLabel: $t("label.empty"),
			label: $pt("form.productSheetLabel"),
			zodSchema: zod.object(
				{ identifier: zod.string() }, 
				{ message: $t("form.rule.required") }
			).transform(item => item.identifier),
			textButton: $t("button.add"),
			onUpdateSearchTerm: name => getProductSheets(undefined, name),
		})),
	});

	return {
		ProductForm: Form,
		checkProductForm: checkForm,
		resetProductForm: resetForm,
		productValues: values
	};
}

