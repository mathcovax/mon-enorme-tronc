import { useGetProductSheets } from "./useGetProductSheets";

export function usePromotionAddForm(organizationId: string) {

	const { productSheets, getProductSheets } = useGetProductSheets(organizationId);

	const { Form, checkForm, resetForm } = useFormBuilder({
		productSheet: computed(() => ({
			type: "combo",
			items: productSheets.value
				.map(
					v => ({ label: v.name, identifier: v.id })
				),
			placeholder: $t("placeholder.productSheet"),
			emptyLabel: $t("label.empty"),
			label: $t("label.productSheet"),
			zodSchema: zod.object(
				{ identifier: zod.string() }, 
				{ message: $t("form.rule.required") }
			).transform(item => item.identifier),
			textButton: $t("button.search"),
			onUpdateSearchTerm: (value: string) => getProductSheets(undefined, value)
		})),
		percentage: {
			type: "number",
			label: $t("label.percentage"),
			zodSchema: zod.number({ message: $t("form.rule.required") })
				.min(0, $t("form.rule.min", { min: 0 }))
				.max(100, $t("form.rule.max", { max: 100 }))
				.positive($t("form.rule.positive"))
		},
		startDate: {
			type: "date",
			label: $t("label.startDate"),
			zodSchema: zod.coerce.date({ message: $t("form.rule.required") })
		},
		endDate: {
			type: "date",
			label: $t("label.endDate"),
			zodSchema: zod.coerce.date({ message: $t("form.rule.required") })
		}
	});

	return {
		FormPromotionAdd: Form,
		checkFormPromotionAdd: checkForm,
		resetFormPromotionAdd: resetForm
	};
}
