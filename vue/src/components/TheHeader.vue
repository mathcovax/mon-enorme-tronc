<script setup lang="ts">
import { ref } from 'vue';

const displayNav = ref(false);

const handleIsActive = (value: boolean) => {
	displayNav.value = value;
};
</script>

<template class="relative">
	<header class="sticky top-0 z-50 h-24 p-6 flex items-center bg-white">
		<div class="container flex gap-10 justify-between lg:justify-center items-center">
			<div class="flex gap-3 items-center">
				<BurgerButton @is-active="handleIsActive" />
				<RouterLink to="/" class="text-2xl font-bold">MET</RouterLink>
			</div>
			<nav>
				<ul class="hidden lg:flex gap-6">
					<li>
						<RouterLink to="#">Meilleures ventes</RouterLink>
					</li>
					<li>
						<RouterLink to="#">Nouveautés</RouterLink>
					</li>
					<li>
						<RouterLink to="#">Produits</RouterLink>
					</li>
				</ul>
			</nav>
			<div class="hidden lg:block grow max-w-144">
				<input type="text" placeholder="Rechercher un produit..."
					class="w-full px-4 py-3 bg-whiteless rounded-full" />
			</div>
			<div class="flex gap-3 items-center">
				<button>
					<span class="block lg:hidden mdi mdi-magnify text-2xl"></span>
				</button>
				<RouterLink to="/cart">
					<span class="mdi mdi-cart-outline text-2xl"></span>
				</RouterLink>
				<RouterLink to="/account">
					<span class="mdi mdi-account-circle-outline text-2xl"></span>
				</RouterLink>
			</div>
		</div>
	</header>
	<nav class="fixed z-40 w-72 h-[calc(100vh-6rem)] bg-white transition-transform duration-300"
		:class="{ '-translate-x-72': !displayNav }">
		<ul class="flex flex-col items-center gap-6 p-6">
			<li>
				<RouterLink to="#">Meilleures ventes</RouterLink>
			</li>
			<li>
				<RouterLink to="#">Nouveautés</RouterLink>
			</li>
			<li>
				<RouterLink to="#">Produits</RouterLink>
			</li>
		</ul>
	</nav>
</template>
