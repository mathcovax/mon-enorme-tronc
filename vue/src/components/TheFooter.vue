<script setup lang="ts">

</script>

<template>
	<footer class="px-24 py-16 bg-whiteless">
		<div>
			<div class="container flex justify-around">
				<div class="flex flex-col gap-6">
					<RouterLink to="/" class="text-2xl font-bold">MET</RouterLink>
					<p>Le plaisir au naturel.</p>
					<nav>
						<ul class="flex gap-3">
							<li>
								<RouterLink to="#">
									<span class="mdi mdi-twitter text-3xl"></span>
								</RouterLink>
							</li>
							<li>
								<RouterLink to="#">
									<span class="mdi mdi-facebook text-3xl"></span>
								</RouterLink>
							</li>
							<li>
								<RouterLink to="#">
									<span class="mdi mdi-instagram text-3xl"></span>
								</RouterLink>
							</li>
						</ul>
					</nav>
				</div>
				<div class="flex flex-col gap-6">
					<h6 class="text-lg font-semibold">AIDE</h6>
					<nav>
						<ul class="flex flex-col gap-6 opacity-60">
							<li>
								<RouterLink to="#">
									Support client
								</RouterLink>
							</li>
							<li>
								<RouterLink to="#">
									Détails de livraison
								</RouterLink>
							</li>
							<li>
								<RouterLink to="#">
									Conditions générales
								</RouterLink>
							</li>
							<li>
								<RouterLink to="#">
									Confidentialité
								</RouterLink>
							</li>
						</ul>
					</nav>
				</div>
				<div class="flex flex-col gap-6">
					<h6 class="text-lg font-semibold">FAQ</h6>
					<nav>
						<ul class="flex flex-col gap-6 opacity-60">
							<li>
								<RouterLink to="#">
									Compte
								</RouterLink>
							</li>
							<li>
								<RouterLink to="#">
									Détails de livraison
								</RouterLink>
							</li>
							<li>
								<RouterLink to="#">
									Commandes
								</RouterLink>
							</li>
							<li>
								<RouterLink to="#">
									Payements
								</RouterLink>
							</li>
						</ul>
					</nav>
				</div>
				<div class="flex flex-col gap-6">
					<h6 class="text-lg font-semibold">Pages</h6>
					<nav>
						<ul class="flex flex-col gap-6 opacity-60">
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
				</div>
			</div>

			<hr class="h-px my-6 border-0 bg-black opacity-10">

			<span class="opacity-60">Mon Énorme Tronc &#169; 2024-{{ new Date().getFullYear() }}. Tous droits
				réservés.</span>
		</div>
	</footer>
</template>
