export function useGetCategoryProductImage(productSheetId: string) {
	const imageUrl = ref<string>("");

	function getCategoryProductImage() {
		return duploTo.enriched
			.get(
				"/product-sheet/{productSheetId}/images",
				{ params: { productSheetId } },
				{ disabledToast: ["productSheet.notfound"] }
			)
			.info("productSheet.images", (data) => {
				const itemImages = data.map(({ id, url }) => ({ id, url }));
	
				imageUrl.value = itemImages[itemImages.length - 1].url;
			});
	}
	getCategoryProductImage();
	
	return {
		imageUrl,
		getCategoryProductImage
	};
}
