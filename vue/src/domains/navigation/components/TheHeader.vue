<script setup lang="ts">

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

					<span class="sr-only">Toggle navigation menu</span>
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
						Accueil
					</RouterLink>

					<RouterLink
						to="#"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
					>
						<TheIcon
							icon="sale-outline"
							size="2xl"
						/>
						Meilleures ventes
					</RouterLink>

					<RouterLink
						to="#"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
					>
						<TheIcon
							icon="new-box"
							size="2xl"
						/>
						Nouveautés
					</RouterLink>

					<RouterLink
						to="#"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
					>
						<TheIcon
							icon="package-variant-closed"
							size="2xl"
						/>
						Produits
					</RouterLink>
				</nav>
			</SheetContent>
		</TheSheet>

		<div class="w-full flex-1 flex gap-10 justify-between md:justify-center items-center">
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
							<RouterLink to="#">
								Meilleures ventes
							</RouterLink>
						</li>

						<li>
							<RouterLink to="#">
								Nouveautés
							</RouterLink>
						</li>

						<li>
							<RouterLink to="#">
								Produits
							</RouterLink>
						</li>
					</ul>
				</nav>

				<div class="hidden lg:block grow max-w-144">
					<input
						type="text"
						placeholder="Rechercher un produit..."
						class="w-full px-4 py-3 bg-whiteless rounded-full"
					>
				</div>

				<div class="flex gap-3 items-center">
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

								<span class="sr-only">Toggle user menu</span>
							</TheButton>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuItem>Settings</DropdownMenuItem>

							<DropdownMenuItem>Support</DropdownMenuItem>

							<DropdownMenuSeparator />

							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	</header>
</template>
