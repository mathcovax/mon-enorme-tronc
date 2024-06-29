<script setup lang="ts">
const { ADMIN_PANEL_HOME, ADMIN_PANEL_ORGANIZATIONS, ADMIN_PANEL_USERS } = routerPageName;
const route = useRoute();
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
				<SheetClose as-child>
					<RouterLink
						:to="{ name: ADMIN_PANEL_HOME }"
						class="mb-6 text-center text-2xl font-bold"
					>
						<span>{{ $t("layout.admin.title") }}</span>
					</RouterLink>
				</SheetClose>
				
				<SheetClose as-child>
					<RouterLink
						:to="{ name: ADMIN_PANEL_HOME }"
						class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
						:class="
							route.name === ADMIN_PANEL_HOME ?
								'bg-muted text-foreground'
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
				</SheetClose>
				
				<SheetClose as-child>
					<RouterLink
						:to="{ name: ADMIN_PANEL_ORGANIZATIONS }"
						class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
						:class="
							route.name === ADMIN_PANEL_ORGANIZATIONS ?
								'bg-muted text-foreground'
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
				</SheetClose>
				
				<SheetClose as-child>
					<RouterLink
						:to="{ name: ADMIN_PANEL_USERS }"
						class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
						:class="
							route.name === ADMIN_PANEL_USERS ?
								'bg-muted text-foreground'
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
				</SheetClose>
			</nav>
		</SheetContent>
	</TheSheet>
</template>
