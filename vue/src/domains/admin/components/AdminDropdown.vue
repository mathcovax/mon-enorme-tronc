<script setup lang="ts">
const userStore = useUserStore();
const { EDITO_HOME, ADMIN_PANEL_HOME, ORGANIZATION_HOME, CONTENT_PANEL_HOME } = routerPageName;
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<TheButton
				variant="secondary"
				size="icon"
				class="rounded-full"
			>
				<TheIcon
					icon="account-outline"
					size="2xl"
				/>
			</TheButton>
		</DropdownMenuTrigger>

		<DropdownMenuContent align="end">
			<DropdownMenuLabel>
				{{ $t("layout.admin.dropdown.management") }}
			</DropdownMenuLabel>

			<DropdownMenuSeparator />

			<DropdownMenuItem v-if="userStore.hasPrimordialRole('ADMIN')">
				<RouterLink :to="ADMIN_PANEL_HOME">
					{{ $t("layout.admin.dropdown.admin") }}
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuItem v-if="userStore.hasPrimordialRole('MODERATOR')">
				<RouterLink :to="{name: ORGANIZATION_HOME}">
					{{ $t("layout.admin.dropdown.organizations") }}
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuItem v-if="userStore.hasPrimordialRole('CONTENTS_MASTER')">
				<RouterLink :to="{name: CONTENT_PANEL_HOME}">
					{{ $t("layout.admin.dropdown.content") }}
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuItem>
				<RouterLink :to="EDITO_HOME">
					{{ $t("layout.admin.dropdown.backHome") }}
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem @click="userStore.removeAccessToken">
				{{ $t("layout.admin.dropdown.logout") }}
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
