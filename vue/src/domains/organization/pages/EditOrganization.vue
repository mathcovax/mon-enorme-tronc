<script lang="ts" setup>
import { useOrganizationEditForm } from "../composables/useOrganizationEditForm";
const { organizationId } = useRouteParams({
	organizationId: zod.string()
});
const {
	FormOrganizationEdit,
	checkFormOrganizationEdit,
	valuesFormOrganziationEdit
} = useOrganizationEditForm(organizationId);
const $pt = usePageTranslate();

async function submit () {
	const formFields = await checkFormOrganizationEdit();

	if (!formFields) {
		return;
	}

	duploTo.enriched
		.patch(
			"/organization/{organizationId}",
			{
				label: formFields.label
			},
			{ params: { organizationId } }
		);

	if (!valuesFormOrganziationEdit.logo.value.blob) {
		return; 
	}

	const formData = new FormData();
	formData.append("logo", valuesFormOrganziationEdit.logo.value.blob);

	duploTo
		.put(
			"/organization/{organizationId}/logo",
			formData,
			{ params: { organizationId } }
		);
}
const inputFile = ref<null | HTMLInputElement>(null);
function addLogo() {
	if (!inputFile.value?.files?.[0]) {
		return; 
	}

	valuesFormOrganziationEdit.logo.value = {
		blob: inputFile.value.files[0], url: URL.createObjectURL(inputFile.value.files[0]) 
	};
}
</script>
<template>
	<div class="flex flex-col items-start gap-24 w-ful">
		<h1 class="text-2xl font-bold lg:text-3xl">
			Modification de l'organisation
		</h1>

		<div class="flex flex-col items-center w-full">
			<FormOrganizationEdit
				@submit="submit"
				class="max-w-[500px] w-[80%]"
			>
				<template #logo="{ modelValue }">
					<div class="flex flex-col items-center gap-4">
						<input
							ref="inputFile"
							type="file"
							class="fixed top-full left-full"
							accept="image/png, image/jpeg"
							@input="addLogo"
						>

						<SecondaryButton
							type="button"
							class="w-full"
							@click="inputFile?.click()"
						>
							<TheIcon icon="plus" />
							{{ $pt("form.addLogo") }}
						</SecondaryButton>

						<img
							v-if="modelValue.url"
							:src="modelValue.url"
							alt="Logo de l'organization"
						>

						<small
							v-else
						>
							Vous n'avez pas de logo. Ajoutez-en un!
						</small>
					</div>
				</template>

				<PrimaryButton
					type="submit"
					class="col-span-12"
				>
					{{ $t("button.save") }}
				</PrimaryButton>
			</FormOrganizationEdit>
		</div>
	</div>
</template>
