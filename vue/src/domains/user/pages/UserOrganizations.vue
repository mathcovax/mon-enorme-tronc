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
		getter: i => i.name
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
	<section class="h-screen-no-header">
		<div 
			class="container h-[calc(100%-3rem)] mt-12 lg:mt-16 flex flex-col gap-12"
		>
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
		</div>
	</section>
</template>
