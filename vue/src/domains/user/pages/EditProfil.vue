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
	<section class="min-h-screen-nhm-mobile lg:min-h-screen-nhm-desktop my-12 lg:my-16 container flex flex-col gap-12">
		<h1 class="text-2xl font-bold lg:text-3xl">
			{{ $pt("title") }}
		</h1>

		<div class="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
			<aside class="flex flex-col items-center gap-4 text-sm text-muted-foreground">
				<div class="flex items-center justify-center w-32 h-32 rounded-full bg-secondary">
					<TheIcon
						icon="account-outline"
						size="3xl"
					/>
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
