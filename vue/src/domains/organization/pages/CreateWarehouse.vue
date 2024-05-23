<script setup lang="ts">
import { useWarehouseForm } from "../composables/useWarehouseForm";

const { organizationId } = useRouteParams({ 
	organizationId: zod.string(), 
});

const {
	WarehouseForm,
	checkWarehouseForm,
	resetWarehouseForm,
} = useWarehouseForm();

const router = useRouter();

async function submit() {

	const formFields = await checkWarehouseForm();

	if (!formFields) {
		return; 
	}

	await duploTo.enriched
		.post(
			"/organization/{organizationId}/warehouse",
			{
				name: formFields.name,
				address: formFields.address
			},
			{ params: { organizationId } }
		)
		.info("warehouse.created", () => {
			resetWarehouseForm();
		});
}

function back() {
	router.push({ name: routerPageName.ORGANIZATION_GET_WAREHOUSE, params: { organizationId } });
}
</script>

<template>
	<div class="w-full flex flex-col items-center p-6 gap-6">
		<WarehouseForm
			@submit="submit"
			class="max-w-[500px] w-[80%]"
		>
			<PrimaryButton
				type="submit"
				class="col-span-12"
			>
				{{ $t("button.create") }}
			</PrimaryButton>
		</WarehouseForm>

		<SecondaryButton @click="back">
			{{ $t("button.back") }}
		</SecondaryButton>
	</div>
</template>
