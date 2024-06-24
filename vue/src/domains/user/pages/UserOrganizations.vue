<script setup lang="ts">
import type { Organization } from "@/lib/utils";
import { useGetUserOganizations } from "../composables/useGetUserOganizations";

const {
	ORGANIZATION_HOME
} = routerPageName;

const $pt = usePageTranslate();

const { organizations, getUserOrganizations } = useGetUserOganizations();

const currentPage = ref(0);
const cols: BigTableColDef<Organization>[] = [
	{
		title: $pt("table.col.name"),
		slotName: "name",
		getter: i => i.name
	},
	{
		title: $pt("table.col.label"),
		getter: i => i.label
	},
	{
		title: $pt("table.col.actions"),
		slotName: "actions", 
		cols: 2
	},
];

function next() {
	if (organizations.value.length < 10) {
		return;
	}

	getUserOrganizations(currentPage.value += 1);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}

	getUserOrganizations(currentPage.value -= 1);
}

getUserOrganizations(currentPage.value);
</script>

<template>
	<section class="min-h-screen-nhm-mobile lg:min-h-screen-nhm-desktop my-12 lg:my-16 container flex flex-col gap-12">
		<h1 class="text-2xl lg:text-3xl font-bold">
			{{ $pt("title") }}
		</h1>

		<div 
			:class="{
				'h-full': organizations.length === 0
			}"
			class="mx-auto flex w-full justify-center items-center"
		>
			<BigTable
				v-if="organizations.length > 0"
				:items="organizations"
				:cols="cols"
				:current-page="currentPage + 1"
				:action-label="$pt('table.col.actions')"
				@click-next="next"
				@click-previous="previous"
			>
				<template #name="{item}">
					<div class="flex gap-2 items-center">
						<img
							v-if="item.logoUrl"
							:src="item.logoUrl"
							width="32"
							height="32"
							alt="logo"
							class="rounded-full"
						>

						<span>{{ item.name }}</span>
					</div>
				</template>
				
				<template #actions="{item}">
					<SecondaryButton
						as-child
					>
						<RouterLink
							:to="{ name: ORGANIZATION_HOME, params: { organizationId: item.id } }"
						>
							{{ $pt("table.action.goTo") }}
						</RouterLink>
					</SecondaryButton>
				</template>
			</BigTable>
		</div>
	</section>
</template>
