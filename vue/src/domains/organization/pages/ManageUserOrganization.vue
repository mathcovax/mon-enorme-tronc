<script setup lang="ts">
import { useGetOrganizationUsers } from "../composables/useGetOrganizationUsers";
import { useOrganizationUserEditForm } from "../composables/useOrganizationUserEditForm";
import { useOrganizationUserAddForm } from "../composables/useOrganizationUserAddForm";
import type { OrganizationUser } from "@/lib/utils";
import type ThePopup from "@/components/ThePopup.vue";

const { organizationId } = useRouteParams({ 
	organizationId: zod.string() 
});
const {
	FormOrganizationUserAdd,
	checkFormOrganizationUserAdd,
	resetFormOrganizationUserAdd
} = useOrganizationUserAddForm();
const {
	FormOrganizationUserEdit,
	checkFormOrganizationUserEdit,
	resetFormOrganizationUserEdit,
	valuesFormOrganizationUserEdit
} = useOrganizationUserEditForm();
const { getOrganizationUsers, organisationUsers } = useGetOrganizationUsers(organizationId);
const currentPage = ref(0);
const searchEmail = ref("");
const popup = ref<InstanceType<typeof ThePopup>>();
const cols: BigTableColDef<OrganizationUser>[] = [
	{
		title: $t("page.organizationUser.table.cols.email"),
		getter: i => i.email
	},
	{
		title: $t("page.organizationUser.table.cols.lastname"),
		getter: i => i.lastname
	},
	{
		title: $t("page.organizationUser.table.cols.firstname"),
		getter: i => i.firstname
	},
	{
		title: $t("page.organizationUser.table.cols.role"),
		getter: i => $t(`organizationRole.${i.organizationRole}`)
	},
];

async function submit() {
	const formFields = await checkFormOrganizationUserAdd();

	if (!formFields) {
		return;
	}

	duploTo.enriched
		.post(
			"/organization/{organizationId}/user",
			{
				email: formFields.email,
				lastname: formFields.lastname,	
				firstname: formFields.firstname,
				organizationRole: formFields.organizationRole
			},
			{ params: { organizationId } }
		)
		.info("organization.user.add", () => {
			resetFormOrganizationUserAdd();
			getOrganizationUsers(currentPage.value=0, searchEmail.value="");
		});
}

function openPopup(user: OrganizationUser) {
	if (user.organizationRole === "OWNER") {
		return; 
	}
	valuesFormOrganizationUserEdit.user.value = user;
	valuesFormOrganizationUserEdit.organizationRole.value = user.organizationRole;
	popup.value?.open();
}

async function submitPatch() {
	const formFields = await checkFormOrganizationUserEdit();

	if (!formFields) {
		return;
	}

	duploTo.enriched
		.patch(
			"/organization/{organizationId}/user/{userId}",
			{
				organizationRole: formFields.organizationRole
			},
			{ params: { organizationId, userId: formFields.user.id } }
		)
		.info("organization.user.edited", () => {
			popup.value?.close();
			resetFormOrganizationUserEdit();
			getOrganizationUsers(currentPage.value, searchEmail.value);
		});
}

function deleteUser() {
	if (!valuesFormOrganizationUserEdit.user.value) {
		return;
	}

	duploTo.enriched
		.delete(
			"/organization/{organizationId}/user/{userId}",
			{
				params: { 
					organizationId, 
					userId: valuesFormOrganizationUserEdit.user.value.id 
				} 
			}
		)
		.info("organization.user.deleted", () => {
			popup.value?.close();
			resetFormOrganizationUserEdit();
			getOrganizationUsers(currentPage.value, searchEmail.value);
		});
}

function next() {
	if (organisationUsers.value.length < 10) {
		return;
	}
	getOrganizationUsers(currentPage.value+=1, searchEmail.value);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}
	getOrganizationUsers(currentPage.value-=1, searchEmail.value);
}

getOrganizationUsers(currentPage.value, searchEmail.value);
watch(searchEmail, () => getOrganizationUsers(currentPage.value = 0, searchEmail.value));
</script>

<template>
	<div class="w-full flex flex-col items-center p-6 gap-6">
		<FormOrganizationUserAdd
			@submit="submit"
			class="max-w-[500px] w-[80%]"
		>
			<PrimaryButton
				type="submit"
				class="col-span-12"
			>
				{{ $t("page.organizationUser.form.submit") }}
			</PrimaryButton>
		</FormOrganizationUserAdd>

		<div class="flex flex-col items-center w-full gap-3">
			<PrimaryInput
				class="max-w-[300px]"
				:placeholder="$t('page.organizationUser.table.searchPlaceholder')"
				v-model="searchEmail"
			/>

			<BigTable 
				:items="organisationUsers"
				:cols="cols"
				@click-next="next"
				@click-previous="previous"
				@click-on-row="openPopup"
				:current-page="currentPage"
			/>
		</div>
	</div>

	<ThePopup
		ref="popup"
		class="max-w-[500px] w-[80%]"
	>
		<template #popupContent>
			<FormOrganizationUserEdit
				@submit="submitPatch"
				class="items-center"
			>
				<template #user="{modelValue}">
					<span class="text-center">{{ modelValue?.email }}</span>
				</template>

				<PrimaryButton
					type="submit"
					class="col-span-8"
				>
					{{ $t("page.organizationUser.form.submit") }}
				</PrimaryButton>

				<TheButton
					type="button"
					@click="deleteUser"
					class="col-span-4"
					variant="destructive"
				>
					{{ $t("page.organizationUser.form.remove") }}
				</TheButton>
			</FormOrganizationUserEdit>
		</template>
	</ThePopup>
</template>