<script setup lang="ts">
import AdminDropdown from "../components/AdminDropdown.vue";
import AdminMobileNavbar from "../components/AdminMobileNavbar.vue";

const user = useUserStore().user;
</script>

<template>
	<header class="container h-24 flex gap-4 items-center border-b bg-muted/40">
		<AdminMobileNavbar />

		<div class="w-full flex-1 text-center md:text-start">
			<span class=" text-xl">Bonjour {{ user?.firstname }} ! Vous êtes <strong>{{ user?.primordialRole }}</strong>.</span>
		</div>

		<AdminDropdown />
	</header>
</template>
