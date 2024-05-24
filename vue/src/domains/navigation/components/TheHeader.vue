<script setup lang="ts">
const userStore = useUserStore();
const { ADMIN_PANEL_HOME } = routerPageName;
</script>

<template>
	<header class="sticky top-0 z-10 h-24 flex items-center gap-4 bg-white px-4 md:px-6">
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
						to="/"
						class="text-center text-2xl font-bold"
					>
						<span>MET</span>
					</RouterLink>

					<RouterLink
						to="/"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
					>
						<TheIcon
							icon="home-outline"
							size="2xl"
						/>
						{{ $t("layout.default.header.home") }}
					</RouterLink>

					<RouterLink
						to="#"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
					>
						<TheIcon
							icon="sale-outline"
							size="2xl"
						/>
						{{ $t("layout.default.header.bestSeller") }}
					</RouterLink>

					<RouterLink
						to="#"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
					>
						<TheIcon
							icon="new-box"
							size="2xl"
						/>
						{{ $t("layout.default.header.new") }}
					</RouterLink>

					<RouterLink
						to="#"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
					>
						<TheIcon
							icon="package-variant-closed"
							size="2xl"
						/>
						{{ $t("layout.default.header.products") }}
					</RouterLink>
				</nav>
			</SheetContent>
		</TheSheet>

		<div class="container px-0 md:px-8 flex-1 flex gap-10 justify-between md:justify-center items-center">
			<RouterLink
				to="/"
				class="text-2xl font-bold"
			>
				MET
			</RouterLink>

			<div class="flex-1 flex gap-6 justify-between items-center">
				<nav>
					<ul class="hidden md:flex gap-6">
						<li>
							<RouterLink to="/">
								{{ $t("layout.default.header.home") }}
							</RouterLink>
						</li>

						<li>
							<RouterLink to="#">
								{{ $t("layout.default.header.bestSeller") }}
							</RouterLink>
						</li>

						<li>
							<RouterLink to="#">
								{{ $t("layout.default.header.new") }}
							</RouterLink>
						</li>

						<li>
							<RouterLink to="#">
								{{ $t("layout.default.header.products") }}
							</RouterLink>
						</li>
					</ul>
				</nav>

				<div class="flex-1 flex gap-3 justify-end items-center">
					<div class="hidden lg:block grow max-w-144">
						<input
							type="text"
							placeholder="Rechercher un produit..."
							class="w-full px-4 py-3 bg-whiteless rounded-full"
						>
					</div>

					<button class="lg:hidden">
						<TheIcon
							icon="magnify"
							size="2xl"
						/>
					</button>

					<RouterLink to="/cart">
						<TheIcon
							icon="cart-outline"
							size="2xl"
						/>
					</RouterLink>

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
							<DropdownMenuLabel v-if="userStore.isConnected">
								{{ $t("layout.default.header.dropdownAccount.myAccount") }}
							</DropdownMenuLabel>

							<DropdownMenuSeparator v-if="userStore.isConnected" />

							<DropdownMenuItem v-if="userStore.isConnected">
								{{ $t("layout.default.header.dropdownAccount.settings") }}
							</DropdownMenuItem>

							<DropdownMenuItem>{{ $t("layout.default.header.dropdownAccount.support") }}</DropdownMenuItem>

							<DropdownMenuSeparator v-if="userStore.user?.primordialRole === 'ADMIN'" />

							<DropdownMenuItem v-if="userStore.user?.primordialRole === 'ADMIN'">
								<RouterLink :to="ADMIN_PANEL_HOME">
									{{ $t("layout.default.header.dropdownAccount.admin") }}
								</RouterLink>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<DropdownMenuItem v-if="userStore.isConnected">
								{{ $t("layout.default.header.dropdownAccount.logout") }}
							</DropdownMenuItem>

							<DropdownMenuItem v-else>
								{{ $t("layout.default.header.dropdownAccount.login") }}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	</header>
</template>
