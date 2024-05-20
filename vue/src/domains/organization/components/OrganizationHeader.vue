<script setup lang="ts">

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
						to="/organization"
						class="text-center text-2xl font-bold"
					>
						<span>{{ $t("layout.organization.title") }}</span>
					</RouterLink>

					<RouterLink
						to="#"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
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
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
					>
						<TheIcon
							icon="package-variant-closed"
							size="2xl"
						/>
						{{ $t("layout.organization.nav.products") }}
					</RouterLink>

					<RouterLink
						to="#"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
					>
						<TheIcon
							icon="account"
							size="2xl"
						/>
						{{ $t("layout.organization.nav.customers") }}
					</RouterLink>

					<RouterLink
						to="#"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
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
				<DropdownMenuLabel>{{ $t("dropdownAccount.myAccount") }}</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem>{{ $t("dropdownAccount.settings") }}</DropdownMenuItem>

				<DropdownMenuItem>{{ $t("dropdownAccount.support") }}</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem>{{ $t("dropdownAccount.logout") }}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</header>
</template>
