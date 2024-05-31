interface ItemMultiComBox {
	label: string,
	value: string | number
}

export interface ItemImage {
	id: string
	url: string
}
export interface ItemImageNew {
	blob: Blob
	url: string
}


export function useProductSheetForm(productSheetId?: string) {
	const $pt = usePageTranslate();
	const suggestedCategories = ref<ItemMultiComBox[]>([]);
	
	function onSearchCategories(categoryName: string) {
		duploTo.enriched.
			get("/categories", { query: { name: categoryName } })
			.s((categories) => {
				suggestedCategories.value = categories.map(
					(category) => ({ label: category.name, value: category.name })
				);
			});
	}

	const { Form, checkForm, resetForm, values } = useFormBuilder({
		name: {
			type: "text",
			label: $t("label.lastname"),
			cols: 6,
			defaultValue: "",
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
				.min(3, { message: $t("form.rule.minLength", { value: 3 }) })
		},
		price: {
			type: "number",
			label: $pt("price"),
			cols: 6,
			defaultValue: 0,
			zodSchema: zod.number({ message: $t("form.rule.required") })
				.min(0.01, { message: $t("form.rule.minLength", { value: 0.01 }) })
		},
		categories: {
			type: "custom",
			label: $t("label.categories"),
			defaultValue: [] as ItemMultiComBox[] | undefined,
			zodSchema: zod.object({
				value: zod.string()
			}).array().max(5, { message: $t("form.rule.maxItems", { value: 5 }) })
		},
		oldCategories: {
			type: "custom",
			defaultValue: undefined as ItemMultiComBox[] | undefined,
		},
		shortDescription: {
			type: "text",
			label: $pt("shortDescription"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
				.min(3, { message: $t("form.rule.minLength", { value: 3 }) })
		},
		description: {
			type: "custom",
			label: $t("label.description"),
			defaultValue: "",
		},
		oldImages: {
			type: "custom",
			defaultValue: undefined as ItemImage[] | undefined,
		},
		images: {
			type: "custom",
			label: $pt("form.image"),
			defaultValue: [] as (ItemImage | ItemImageNew)[],
			zodSchema: zod.object({
				blob: zod.instanceof(Blob)
					.refine((blob) => blob.size <= 5000000, { message: $t("form.rule.blobToLarge", { value: "5 Mo" }) })
					.optional(),
				id: zod.string().optional()
			}).array()
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
				const categoriesItems = data.map(c => ({ label: c.name, value: c.name }));
				values.categories.value = categoriesItems;
				values.oldCategories.value = categoriesItems;
			});
		
		duploTo.enriched
			.get(
				"/product-sheet/{productSheetId}/images",
				{ params: { productSheetId } }
			)
			.info("productSheet.images", (data) => {
				const itemImages = data.map(({ id, url }) => ({ id, url }));
				values.images.value = itemImages;
				values.oldImages.value = itemImages;
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
