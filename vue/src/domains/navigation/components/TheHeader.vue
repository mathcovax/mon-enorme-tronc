<script setup lang="ts">
const displayNav = ref(false);

function handleBurgerButtonToggle(value: boolean) {
	displayNav.value = value;
}
</script>

<template>
	<header class="sticky top-0 z-50 h-24 p-6 flex items-center bg-white">
		<div class="container flex gap-10 justify-between lg:justify-center items-center">
			<div class="flex gap-3 items-center">
				<BurgerButton @on-toggle="handleBurgerButtonToggle" />
				<RouterLink
					to="/"
					class="text-2xl font-bold"
				>
					MET
				</RouterLink>
			</div>
			<nav>
				<ul class="hidden lg:flex gap-6">
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
				<RouterLink to="/account">
					<TheIcon
						icon="account-circle-outline"
						size="2xl"
					/>
				</RouterLink>
			</div>
		</div>
	</header>
	<nav
		class="fixed z-40 w-72 h-[calc(100vh-6rem)] bg-white transition-transform duration-300"
		:class="{ '-translate-x-72': !displayNav }"
	>
		<ul class="flex flex-col items-center gap-6 p-6">
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
</template>
