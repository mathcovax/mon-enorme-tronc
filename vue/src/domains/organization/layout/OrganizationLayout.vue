<script setup lang="ts">
import OrganizationHeader from "../components/OrganizationHeader.vue";
import OrganizationNavbar from "../components/OrganizationNavbar.vue";
</script>

<template>
	<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
		<OrganizationNavbar />

		<div class="flex flex-col">
			<OrganizationHeader />

			<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
				<RouterView />
			</main>
		</div>
	</div>
</template>
