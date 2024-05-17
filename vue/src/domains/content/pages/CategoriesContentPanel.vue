<script setup lang="ts">
import { useCategoryForm } from "../composables/useCategoryForm";

const { CategoryForm, checkCategoryForm } = useCategoryForm();

</script>

<template>
	<div class="w-full flex flex-col items-center p-6 gap-10">
		<CategoryForm class="max-w-[500px] w-[80%] items-center">
			<PrimaryButton
				type="submit"
				class="col-span-12"
			>
				{{ $t("page.manageCategories.form.submit") }}
			</PrimaryButton>
		</CategoryForm>
	</div>
</template>
