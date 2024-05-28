import { type Product } from "@/lib/utils";
import { useGetWarehouses } from "./useGetWarehouses";

export function useProductForm(organizationId: string) {

	const { searchProductSheets, productSheetNames } = useSearchProductSheets(organizationId);
	const { getWarehouses, warehouses } = useGetWarehouses(organizationId);
	const $pt = usePageTranslate();

	const { Form, checkForm, resetForm, values } = useFormBuilder({
		product: {
			type: "custom",
			defaultValue: undefined as undefined | Product,
			zodSchema: zod.object({ id: zod.string() }).optional(),
		},
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
			items: productSheetNames.value.map(v => ({ label: v.name, identifier: v.id })),
			placeholder: $pt("form.productSheetPlaceholder"),
			emptyLabel: $t("label.empty"),
			label: $pt("form.productSheetLabel"),
			zodSchema: zod.object(
				{ identifier: zod.string() }, 
				{ message: $t("form.rule.required") }
			).transform(item => item.identifier),
			textButton: $t("button.add"),
			onUpdateSearchTerm: searchProductSheets,
		})),
		warehouse: computed(() => ({
			type: "combo",
			items: warehouses.value.map(v => ({ label: v.name, identifier: v.id })),
			placeholder: $pt("form.warehousePlaceholder"),
			emptyLabel: $t("label.empty"),
			label: $pt("form.warehouseLabel"),
			zodSchema: zod.object(
				{ identifier: zod.string() }, 
				{ message: $t("form.rule.required") }
			).transform(item => item.identifier),
			textButton: $t("button.add"),
			onUpdateSearchTerm: (name: string) => { getWarehouses(undefined, name); },
		})),
	});

	return {
		ProductForm: Form,
		checkProductForm: checkForm,
		resetProductForm: resetForm,
		productValues: values
	};
}

// move
export function useSearchProductSheets(organizationId: string) {
	const productSheetNames = ref<{name: string, id: string}[]>([]);

	function searchProductSheets(productSheetName: string) {
		duploTo.enriched
			.get(
				"/organization/{organizationId}/product-sheets",
				{ params: { organizationId }, query: { name: productSheetName } }
			)
			.s((res) => {
				productSheetNames.value = res.map((r) => ({ name: r.name, id: r.id })); 
			});
	}

	return {
		productSheetNames,
		searchProductSheets
	};
}
