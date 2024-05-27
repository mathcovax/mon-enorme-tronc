<script setup lang="ts">
const userStore = useUserStore();
const { USER_EDIT_PROFIL, ADMIN_PANEL_HOME, ORGANIZATION_HOME, CONTENT_PANEL_HOME } = routerPageName;
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
				{{ $t("layout.default.header.dropdownAccount.myAccount") }}
			</DropdownMenuLabel>

			<DropdownMenuSeparator />

			<DropdownMenuItem>
				<RouterLink :to="USER_EDIT_PROFIL">
					{{ $t("layout.default.header.dropdownAccount.editProfil") }}
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuItem>{{ $t("layout.default.header.dropdownAccount.support") }}</DropdownMenuItem>

			<DropdownMenuSeparator v-if="userStore.hasPrimordialRole('ADMIN') || userStore.hasPrimordialRole('MODERATOR') || userStore.hasPrimordialRole('CONTENTS_MASTER')" />

			<DropdownMenuLabel v-if="userStore.hasPrimordialRole('ADMIN') || userStore.hasPrimordialRole('MODERATOR') || userStore.hasPrimordialRole('CONTENTS_MASTER')">
				{{ $t("layout.default.header.dropdownAccount.management") }}
			</DropdownMenuLabel>

			<DropdownMenuSeparator v-if="userStore.hasPrimordialRole('ADMIN') || userStore.hasPrimordialRole('MODERATOR') || userStore.hasPrimordialRole('CONTENTS_MASTER')" />

			<DropdownMenuItem v-if="userStore.hasPrimordialRole('ADMIN')">
				<RouterLink :to="ADMIN_PANEL_HOME">
					{{ $t("layout.default.header.dropdownAccount.admin") }}
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuItem v-if="userStore.hasPrimordialRole('MODERATOR')">
				<RouterLink :to="ORGANIZATION_HOME">
					{{ $t("layout.default.header.dropdownAccount.organizations") }}
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuItem v-if="userStore.hasPrimordialRole('CONTENTS_MASTER')">
				<RouterLink :to="CONTENT_PANEL_HOME">
					{{ $t("layout.default.header.dropdownAccount.content") }}
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem @click="userStore.removeAccessToken">
				{{ $t("layout.default.header.dropdownAccount.logout") }}
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
