<script setup lang="ts">
import type { Organization } from "@/lib/utils";
import { useCreateOrganizationForm } from "../composables/useCreateOrganizationForm"; 
import { useGetOganizations } from "../composables/useGetOganizations"; 

const { 
	CreateOrganizationForm, 
	checkCreateOrganizationForm, 
	resetCreateOrganizationForm 
} = useCreateOrganizationForm();
const { organizations, getOrganizations } = useGetOganizations();

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
			getOrganizations(currentPage.value = 0, searchName.value = "");
		});
}

const currentPage = ref(0);
const searchName = ref("");
const cols: BigTableColDef<Organization>[] = [
	{
		title: $t("page.createOrganization.table.cols.name"),
		getter: i => i.name
	},
	{
		title: $t("page.createOrganization.table.cols.id"),
		getter: i => i.id
	},
	{
		title: $t("page.createOrganization.table.cols.suspended"),
		slotName: "suspended", 
	},
	{
		title: $t("page.createOrganization.table.cols.actions"),
		slotName: "actions", 
		cols: 2
	},
];

function next(){
	if(organizations.value.length < 10 ) {
		return;
	}
	getOrganizations(currentPage.value+=1, searchName.value);
}

function previous(){
	if(currentPage.value === 0 ) {
		return;
	}
	getOrganizations(currentPage.value-=1, searchName.value);
}

function suspended(organization: Organization){
	duploTo.enriched
		.patch(
			"/organization/{organizationId}@admin",
			{
				suspended: !organization.suspended
			},
			{ params: { organizationId: organization.id } }
		)
		.info("organization.edited", () => {
			getOrganizations(currentPage.value, searchName.value);
		});
}

getOrganizations(currentPage.value, searchName.value);
watch(searchName, () => getOrganizations(currentPage.value = 0, searchName.value));
</script>

<template>
	<div class="w-full flex flex-col items-center p-6 gap-10">
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

		<div class="flex flex-col items-center w-full gap-3">
			<PrimaryInput
				class="max-w-[300px]"
				:placeholder="$t('page.createOrganization.table.searchPlaceholder')"
				v-model="searchName"
			/>

			<BigTable
				:items="organizations"
				:cols="cols"
				:current-page="currentPage + 1"
				:action-label="$t('page.createOrganization.table.cols.actions')"
				@click-next="next"
				@click-previous="previous"
			>
				<template #suspended="{item}">
					<TheIcon
						:icon="item.suspended ? 'close' : 'check'"
						:class="{
							'text-green-400': !item.suspended, 
							'text-red-400': item.suspended
						}"
					/>
				</template>

				<template #actions="{item}">
					<SecondaryButton @click="suspended(item)">
						{{ $t(item.suspended ? "page.createOrganization.table.enabled" : "page.createOrganization.table.suspended") }}
					</SecondaryButton>
				</template>
			</BigTable>
		</div>
	</div>
</template>
