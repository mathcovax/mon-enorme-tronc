<script setup lang="ts">
import AdminHeader from "../components/AdminHeader.vue";
import AdminNavbar from "../components/AdminNavbar.vue";
</script>

<template>
	<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
		<AdminNavbar />

		<div class="flex flex-col">
			<AdminHeader />

			<main class="p-4 lg:p-6 flex flex-1 flex-col gap-4 lg:gap-6 shadow-inner-top-left">
				<RouterView />
			</main>
		</div>
	</div>
</template>
