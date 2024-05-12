<script setup lang="ts">
import { useCreateOrganizationForm } from "../composables/useCreateOrganizationForm"; 

const { 
	CreateOrganizationForm, 
	checkCreateOrganizationForm, 
	resetCreateOrganizationForm 
} = useCreateOrganizationForm();

async function submit() {
	const formFields = await checkCreateOrganizationForm();

	if(!formFields) {
		return; 
	}

	await duploTo.enriched
		.post(
			"/organization",
			{
				name: formFields.name,
				ownerId: formFields.ownerId
			}
		)
		.info("organization.created", () => {
			resetCreateOrganizationForm();
		});
}
</script>

<template>
	<div class="w-full flex flex-col items-center p-6">
		<CreateOrganizationForm
			@submit="submit"
			class="max-w-[500px] w-[80%]"
		>
			<PrimaryButton
				type="submit"
				class="col-span-12"
			>
				{{ $t("page.createOrganization.form.submit") }}
			</PrimaryButton>
		</CreateOrganizationForm>
	</div>
</template>
