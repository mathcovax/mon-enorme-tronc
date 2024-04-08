<script setup lang="ts">

</script>

<template>
	<header class="h-24 p-6 flex items-center">
		<div class="container flex gap-10 justify-center items-center">
			<RouterLink to="/" class="text-2xl font-bold">MET</RouterLink>
			<nav>
				<ul class="flex gap-6">
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
			<div class="grow max-w-144">
				<input type="text" placeholder="Rechercher un produit..."
					class="w-full px-4 py-3 bg-whiteless rounded-full" />
			</div>
			<div class="flex gap-3 items-center">
				<RouterLink to="/cart">
					<span class="mdi mdi-cart-outline text-2xl"></span>
				</RouterLink>
				<RouterLink to="/account">
					<span class="mdi mdi-account-circle-outline text-2xl"></span>
				</RouterLink>
			</div>
		</div>
	</header>
</template>
