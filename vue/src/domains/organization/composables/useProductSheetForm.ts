interface ItemMultiComBox {
	label: string,
	value: string | number
}

export function useProductSheetForm(productSheetId?: string) {
	const $pt = usePageTranslate();
	const suggestedCategories = ref<ItemMultiComBox[]>([]);
	
	function onSearchCategories(categoryName: string) {
		duploTo.enriched.
			get("/categories", { query: { name: categoryName } })
			.s((categories) => {
				suggestedCategories.value = categories.map(
					(category) => ({ label: category.name, value: category.id })
				);
			});
	}

	const { Form, checkForm, resetForm, values } = useFormBuilder({
		name: {
			type: "text",
			label: $t("label.lastname"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
				.min(2, { message: $t("form.rule.minLength", { value: 2 }) })
		},
		description: {
			type: "textarea",
			label: $t("label.description"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
				.min(2, { message: $t("form.rule.minLength", { value: 2 }) })
		},
		shortDescription: {
			type: "text",
			label: $pt("shortDescription"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
				.min(2, { message: $t("form.rule.minLength", { value: 2 }) })
		},
		price: {
			type: "number",
			label: $t("price"),
			defaultValue: 0,
			zodSchema: zod.number({ message: $t("form.rule.required") })
				.min(0.01, { message: $t("form.rule.minLength", { value: 0.01 }) })
		},
		categories: {
			type: "custom",
			label: $t("label.categories"),
			defaultValue: undefined as ItemMultiComBox[] | undefined,
			zodSchema: zod.object({
				value: zod.string()
			}).array().max(5, { message: $t("form.rule.maxItems", { value: 5 }) })
		},
		oldCategories: {
			type: "custom",
			defaultValue: undefined as ItemMultiComBox[] | undefined,
		}
	});

	if (productSheetId) {
		duploTo.enriched
			.get(
				"/product-sheet/{productSheetId}",
				{ params: { productSheetId } }
			)
			.info("productSheet.found", (data) => {
				values.name.value = data.name;
				values.description.value = data.description;
				values.shortDescription.value = data.shortDescription;
				values.price.value = data.price;
			});
	
		duploTo.enriched
			.get(
				"/product-sheet/{productSheetId}/categories",
				{ params: { productSheetId } }
			)
			.info("productSheet.categories", (data) => {
				const categoriesItems = data.map(c => ({ label: c.name, value: c.id }));
				values.categories.value = categoriesItems;
				values.oldCategories.value = categoriesItems;
			});
	}

	return {
		ProductSheetForm: Form,
		checkProductSheetForm: checkForm,
		resetProductSheetForm: resetForm,
		ProductSheetValues: values,
		onSearchCategories,
		suggestedCategories
	};
}
