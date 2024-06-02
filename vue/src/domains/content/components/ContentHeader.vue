<script setup lang="ts">
import ContentDropdown from "@/domains/content/components/ContentDropdown.vue";
import ContentMobileNavbar from "@/domains/content/components/ContentMobileNavbar.vue";

const userStore = useUserStore();
</script>

<template>
	<header class="container h-24 flex gap-4 items-center border-b bg-muted/40">
		<ContentMobileNavbar />

		<div class="w-full flex-1 text-center md:text-start">
			<span class=" text-xl">Bonjour {{ userStore.user?.firstname }} ! Vous êtes <strong>{{ userStore.user?.primordialRole }}</strong>.</span>
		</div>

		<ContentDropdown />
	</header>
</template>
