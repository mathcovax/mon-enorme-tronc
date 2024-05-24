<script setup lang="ts">
import { useOrganizationUserStore } from "@/domains/organization/stores/organizationUser";

const { ORGANIZATION_MANAGE_USER, ORGANIZATION_GET_WAREHOUSE } = routerPageName;
const route = useRoute();
const organizationUserStore = useOrganizationUserStore();

const tmp = ref(false);
</script>

<template>
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-24 justify-center items-center border-b px-4 lg:px-6">
				<RouterLink
					to="/organization"
					class="flex items-center gap-2 text-center font-semibold"
				>
					<span>{{ $t("layout.organization.title") }}</span>
				</RouterLink>
			</div>

			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					<RouterLink
						to="#"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							tmp ?
								'bg-muted text-primary'
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
						v-if="organizationUserStore.hasRole('STORE_KEEPER')"
						to="#"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							tmp ?
								'bg-muted text-primary'
								:
								'text-muted-foreground'
						"
					>
						<TheIcon
							icon="cart-outline"
							size="2xl"
						/>
						{{ $t("layout.organization.nav.orders") }}
					</RouterLink>

					<RouterLink
						v-if="organizationUserStore.hasRole('PRODUCT_SHEET_MANAGER')"
						to="#"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							tmp ?
								'bg-muted text-primary'
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
						v-if="organizationUserStore.hasRole('OWNER')"
						to="#"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							route.name === ORGANIZATION_MANAGE_USER ?
								'bg-muted text-primary'
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
						v-if="organizationUserStore.hasRole('ACCOUNTANT')"
						to="#"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							tmp ?
								'bg-muted text-primary'
								:
								'text-muted-foreground'
						"
					>
						<TheIcon
							icon="chart-line"
							size="2xl"
						/>
						{{ $t("layout.organization.nav.analytics") }}
					</RouterLink>

					<RouterLink
						v-if="organizationUserStore.hasRole('OWNER')"
						to="#"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							route.name === ORGANIZATION_GET_WAREHOUSE ?
								'bg-muted text-primary'
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
			</div>
		</div>
	</div>
</template>

