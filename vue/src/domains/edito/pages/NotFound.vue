<script setup lang="ts">

</script>

<template>
	<section class="h-screen-nh flex flex-col items-center justify-center">
		<h1 class="text-3xl lg:text-5xl font-bold">
			{{ $t("page.notFound.title") }}
		</h1>

		<p class="mt-4 text-base lg:text-lg font-medium opacity-50">
			{{ $t("page.notFound.description") }}
		</p>

		<TheButton
			size="lg"
			class="mt-8 w-min"
			as-child
		>
			<RouterLink to="/">
				{{ $t("button.backToHome") }}
			</RouterLink>
		</TheButton>
	</section>
</template>
