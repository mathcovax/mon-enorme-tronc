<script setup lang="ts">
const route = useRoute();
</script>

<template>
	<section class="h-screen-no-header">
		<div 
			class="container h-[calc(100%-3rem)] mt-12 lg:mt-16 flex flex-col gap-12"
		>
			<h1 class="text-2xl lg:text-3xl font-bold">
				{{ route.params.categoryName }}
			</h1>
		</div>
	</section>
</template>
