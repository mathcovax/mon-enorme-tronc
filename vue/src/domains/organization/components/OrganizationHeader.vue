<script setup lang="ts">
const { ORGANIZATION_HOME, ORGANIZATION_MANAGE_USER } = routerPageName;
const route = useRoute();
</script>

<template>
	<header class="flex h-24 items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
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
						to="#"
						class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
						:class="
							route.name ?
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
						to="#"
						class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
						:class="
							route.name ?
								'bg-muted text-foreground'
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
				</nav>
			</SheetContent>
		</TheSheet>

		<div class="w-full flex-1" />

		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<TheButton
					variant="secondary"
					size="icon"
					class="rounded-full"
				>
					<TheIcon
						icon="account-circle-outline"
						size="2xl"
					/>
				</TheButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{{ $t("dropdown.myAccount") }}</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem>{{ $t("dropdown.settings") }}</DropdownMenuItem>

				<DropdownMenuItem>{{ $t("dropdown.support") }}</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem>{{ $t("dropdown.logout") }}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</header>
</template>
