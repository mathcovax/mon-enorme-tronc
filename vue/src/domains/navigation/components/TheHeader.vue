<script setup lang="ts">
import AccountDropdown from "@/domains/navigation/components/AccountDropdown.vue";
import MobileNavbar from "@/domains/navigation/components/MobileNavbar.vue";
const { AUTH_LOGIN } = routerPageName;
const userStore = useUserStore();
</script>

<template>
	<header class="sticky top-0 z-10 h-24 flex items-center gap-4 bg-white px-4 md:px-6">
		<MobileNavbar />

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

					<RouterLink
						:to="{name: AUTH_LOGIN}"
						v-if="!userStore.isConnected"
					>
						<TheButton
							variant="secondary"
							size="icon"
							class="rounded-full"
						>
							<TheIcon
								icon="account-plus-outline"
								size="2xl"
							/>
						</TheButton>
					</Routerlink>
				
					<AccountDropdown v-else />
				</div>
			</div>
		</div>
	</header>
</template>
