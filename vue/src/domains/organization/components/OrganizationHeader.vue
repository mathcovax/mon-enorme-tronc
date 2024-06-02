<script setup lang="ts">
import OrganizationDropdown from "../components/OrganizationDropdown.vue";
import OrganizationMobileNavbar from "../components/OrganizationMobileNavbar.vue";

const userStore = useUserStore();
</script>

<template>
	<header class="flex h-24 items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
		<OrganizationMobileNavbar />

		<div class="w-full flex-1 text-center md:text-start">
			<span class=" text-xl">Bonjour {{ userStore.user?.firstname }} ! Vous êtes <strong>{{ userStore.user?.primordialRole }}</strong>.</span>
		</div>

		<OrganizationDropdown />
	</header>
</template>
