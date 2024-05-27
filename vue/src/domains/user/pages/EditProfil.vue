<script setup lang="ts">
import { useEditUserProfilForm } from "../composables/useEditUserProfilForm";

const $pt = usePageTranslate();

const user = useUserStore().user;

const {
	EditUserProfilForm,
	checkEditUserProfilForm,
} = useEditUserProfilForm(user?.id);

async function submit() {
	const formFields = await checkEditUserProfilForm();

	console.log(formFields);

	if (!formFields) {
		return;
	}

	await duploTo.enriched
		.patch(
			"/user",
			{
				lastname: formFields.lastname,
				firstname: formFields.firstname,
				address: formFields.address,
			},
		)
		.result;
}
</script>

<template>
	<section class="h-screen-no-header flex flex-1 flex-col gap-8 bg-muted/40 p-4 md:gap-12 md:p-10">
		<div class="mx-auto grid w-full max-w-6xl gap-2">
			<h1 class="text-2xl lg:text-3xl font-bold">
				{{ $pt("title") }}
			</h1>
		</div>

		<div class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
			<aside class="grid gap-4 text-sm text-muted-foreground">
				<div class="flex flex-col items-center justify-center gap-2">
					<div class="w-32 h-32 rounded-full bg-secondary flex items-center justify-center">
						<TheIcon
							icon="account-outline"
							size="3xl"
						/>
					</div>

					<SecondaryButton>
						{{ $t("button.edit") }}
					</SecondaryButton>
				</div>

				<div class="text-center">
					{{ user?.firstname }} {{ user?.lastname }}
				</div>
			</aside>

			<div class="grid gap-6">
				<EditUserProfilForm 
					@submit="submit"
				>
					<PrimaryButton
						type="submit"
						class="col-span-12"
					>
						{{ $t("button.save") }}
					</PrimaryButton>
				</EditUserProfilForm>
			</div>
		</div>
	</section>
</template>
