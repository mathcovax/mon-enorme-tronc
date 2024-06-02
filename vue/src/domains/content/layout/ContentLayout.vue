<script setup lang="ts">
import ContentHeader from "../components/ContentHeader.vue";
import ContentNavbar from "../components/ContentNavbar.vue";
</script>

<template>
	<div class="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
		<ContentNavbar class="h-full" />

		<div class="flex flex-col overflow-hidden h-full">
			<ContentHeader class="shrink-0" />

			<main class="flex flex-col shadow-inner-top-left grow overflow-hidden">
				<RouterView class="overflow-y-auto p-4 lg:p-6" />
			</main>
		</div>
	</div>
</template>
