<script setup lang="ts">
const { ADMIN_PANEL_HOME, ADMIN_PANEL_ORGANIZATIONS, ADMIN_PANEL_USERS } = routerPageName;
const route = useRoute();
</script>

<template>
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-24 justify-center items-center border-b px-4 lg:px-6">
				<RouterLink
					:to="{ name: ADMIN_PANEL_HOME }"
					class="flex items-center gap-2 text-center font-semibold"
				>
					<span>{{ $t("layout.admin.title") }}</span>
				</RouterLink>
			</div>

			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					<RouterLink
						:to="{ name: ADMIN_PANEL_HOME }"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							route.name === ADMIN_PANEL_HOME ?
								'bg-muted text-primary'
								:
								'text-muted-foreground'
						"
					>
						<TheIcon
							icon="home-outline"
							size="2xl"
						/>
						{{ $t("layout.admin.nav.home") }}
					</RouterLink>

					<RouterLink
						:to="{ name: ADMIN_PANEL_ORGANIZATIONS }"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							route.name === ADMIN_PANEL_ORGANIZATIONS ?
								'bg-muted text-primary'
								:
								'text-muted-foreground'
						"
					>
						<TheIcon
							icon="domain"
							size="2xl"
						/>
						{{ $t("layout.admin.nav.organizations") }}
					</RouterLink>

					<RouterLink
						:to="{ name: ADMIN_PANEL_USERS }"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							route.name === ADMIN_PANEL_USERS ?
								'bg-muted text-primary'
								:
								'text-muted-foreground'
						"
					>
						<TheIcon
							icon="account-multiple"
							size="2xl"
						/>
						{{ $t("layout.admin.nav.users") }}
					</RouterLink>
				</nav>
			</div>
		</div>
	</div>
</template>

