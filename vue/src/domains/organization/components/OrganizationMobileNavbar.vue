<script setup lang="ts">
import { useOrganizationUserStore } from "@/domains/organization/stores/organizationUser";

const { 
	ORGANIZATION_HOME,
	ORGANIZATION_MANAGE_USER,
	ORGANIZATION_EDIT,
	ORGANIZATION_MANAGE_PRODUCT,
	ORGANIZATION_GET_PRODUCT_SHEET,
	ORGANIZATION_GET_WAREHOUSE
} = routerPageName;
const route = useRoute();
const organizationUserStore = useOrganizationUserStore();
</script>

<template>
	<TheSheet>
		<SheetTrigger as-child>
			<TheButton
				variant="outline"
				size="icon"
				class="shrink-0 md:hidden"
			>
				<TheIcon
					icon="menu"
					size="2xl"
				/>
			</TheButton>
		</SheetTrigger>

		<SheetContent
			side="left"
			class="flex flex-col"
		>
			<nav class="grid gap-2 text-lg font-medium">
				<RouterLink
					:to="{ name: ORGANIZATION_HOME }"
					class="text-center text-2xl font-bold"
				>
					<span>{{ $t("layout.organization.title") }}</span>
				</RouterLink>

				<RouterLink
					:to="{ name: ORGANIZATION_HOME }"
					class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
					:class="
						route.name === ORGANIZATION_HOME ?
							'bg-muted text-foreground'
							:
							'text-muted-foreground'
					"
				>
					<TheIcon
						icon="home-outline"
						size="2xl"
					/>
					{{ $t("layout.organization.nav.dashboard") }}
				</RouterLink>

				<RouterLink
					v-if="organizationUserStore.hasRole('OWNER')"
					:to="{ name: ORGANIZATION_EDIT }"
					class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
					:class="
						route.name === ORGANIZATION_EDIT ?
							'bg-muted text-foreground'
							:
							'text-muted-foreground'
					"
				>
					<TheIcon
						icon="store-edit"
						size="2xl"
					/>
					{{ $t("layout.organization.nav.organizationEdit") }}
				</RouterLink>

				<RouterLink
					v-if="organizationUserStore.hasRole('STORE_KEEPER')"
					to="#"
					class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
				>
					<TheIcon
						icon="cart-outline"
						size="2xl"
					/>
					{{ $t("layout.organization.nav.orders") }}
				</RouterLink>

				<RouterLink
					v-if="organizationUserStore.hasRole('PRODUCT_SHEET_MANAGER')"
					:to="{ name: ORGANIZATION_GET_PRODUCT_SHEET }"
					class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
					:class="
						route.name === ORGANIZATION_GET_PRODUCT_SHEET ?
							'bg-muted text-foreground'
							:
							'text-muted-foreground'
					"
				>
					<TheIcon
						icon="text-box-multiple-outline"
						size="2xl"
					/>
					{{ $t("layout.organization.nav.productSheets") }}
				</RouterLink>

				<RouterLink
					v-if="organizationUserStore.hasRole('STORE_KEEPER')"
					:to="{ name: ORGANIZATION_MANAGE_PRODUCT }"
					class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
					:class="
						route.name === ORGANIZATION_MANAGE_PRODUCT ?
							'bg-muted text-foreground'
							:
							'text-muted-foreground'
					"
				>
					<TheIcon
						icon="package-variant-closed"
						size="2xl"
					/>
					{{ $t("layout.organization.nav.products") }}
				</RouterLink>

				<RouterLink
					:to="{ name: ORGANIZATION_MANAGE_USER }"
					class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
					:class="
						route.name === ORGANIZATION_MANAGE_USER ?
							'bg-muted text-foreground'
							:
							'text-muted-foreground'
					"
				>
					<TheIcon
						icon="account"
						size="2xl"
					/>
					{{ $t("layout.organization.nav.users") }}
				</RouterLink>

				<RouterLink
					v-if="organizationUserStore.hasRole('OWNER')"
					:to="{ name: ORGANIZATION_GET_WAREHOUSE }"
					class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
					:class="
						route.name === ORGANIZATION_GET_WAREHOUSE ?
							'bg-muted text-foreground'
							:
							'text-muted-foreground'
					"
				>
					<TheIcon
						icon="warehouse"
						size="2xl"
					/>
					{{ $t("layout.organization.nav.warehouse") }}
				</RouterLink>
			</nav>
		</SheetContent>
	</TheSheet>
</template>