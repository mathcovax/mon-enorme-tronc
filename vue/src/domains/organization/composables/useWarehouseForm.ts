import type { Warehouse } from "@/lib/utils";

export function useWarehouseForm() {

	const { searchAddresses, addresses } = useSearchAddresses();

	const { Form, checkForm, resetForm, values } = useFormBuilder({
		warehouse: {
			type: "custom",
			defaultValue: undefined as undefined | Warehouse,
			zodSchema: zod.object({ id: zod.string() }).optional(),
		},
		name: {
			type: "text",
			label: $t("label.lastname"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
				.min(2, { message: $t("form.rule.minLength", { value: 2 }) })
		},
		address: computed(() => ({
			type: "combo",
			items: addresses.value.map(v => ({ label: v, identifier: v })),
			placeholder: $t("placeholder.address"),
			emptyLabel: $t("label.empty"),
			label: $t("label.address"),
			zodSchema: zod.object(
				{ label: zod.string() }, 
				{ message: $t("form.rule.required") }
			).transform(item => item.label),
			textButton: $t("button.add"),
			onUpdateSearchTerm: searchAddresses
		})),
	});

	return {
		WarehouseForm: Form,
		checkWarehouseForm: checkForm,
		resetWarehouseForm: resetForm,
		warehouseValues: values
	};
}
