<script setup lang="ts">
import TheNavbar from "./TheNavbar.vue";
import AccountDropdown from "../components/AccountDropdown.vue";
import MobileNavbar from "../components/MobileNavbar.vue";

const { EDITO_HOME, AUTH_LOGIN } = routerPageName;
const userStore = useUserStore();
</script>

<template>
	<header class="sticky w-full top-0 z-10 bg-white shadow-md">
		<div class="h-24 container flex items-center gap-4">
			<MobileNavbar />

			<div class="flex-1 flex gap-10 justify-between md:justify-center items-center">
				<RouterLink
					:to="{ name: EDITO_HOME }"
					class="text-2xl font-bold"
				>
					MET
				</RouterLink>

				<div class="flex-1 flex gap-6 justify-between items-center">
					<TheNavbar class="hidden md:block" />

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
		</div>
	</header>
</template>
