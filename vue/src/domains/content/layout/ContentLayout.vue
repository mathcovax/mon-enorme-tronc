<script setup lang="ts">
import ContentHeader from "../components/ContentHeader.vue";
import ContentNavbar from "../components/ContentNavbar.vue";
</script>

<template>
	<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
		<ContentNavbar />

		<div class="flex flex-col">
			<ContentHeader />

			<main class="p-4 lg:p-6 flex flex-1 flex-col gap-4 lg:gap-6 shadow-inner-top-left">
				<RouterView />
			</main>
		</div>
	</div>
</template>
