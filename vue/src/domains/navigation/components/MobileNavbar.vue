<script setup lang="ts">

</script>

<template>
	<TheSheet>
		<SheetTrigger as-child>
			<TheButton
				variant="outline"
				size="icon"
				class="shrink-0 md:hidden"
			>
				<TheIcon
					icon="menu"
					size="2xl"
				/>
			</TheButton>
		</SheetTrigger>

		<SheetContent
			side="left"
			class="flex flex-col"
		>
			<nav class="grid gap-2 text-lg font-medium">
				<RouterLink
					to="/"
					class="text-center text-2xl font-bold"
				>
					<span>MET</span>
				</RouterLink>

				<RouterLink
					to="/"
					class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
				>
					<TheIcon
						icon="home-outline"
						size="2xl"
					/>
					{{ $t("layout.default.header.home") }}
				</RouterLink>

				<RouterLink
					to="#"
					class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
				>
					<TheIcon
						icon="sale-outline"
						size="2xl"
					/>
					{{ $t("layout.default.header.bestSeller") }}
				</RouterLink>

				<RouterLink
					to="#"
					class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
				>
					<TheIcon
						icon="new-box"
						size="2xl"
					/>
					{{ $t("layout.default.header.new") }}
				</RouterLink>

				<RouterLink
					to="#"
					class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
				>
					<TheIcon
						icon="package-variant-closed"
						size="2xl"
					/>
					{{ $t("layout.default.header.products") }}
				</RouterLink>
			</nav>
		</SheetContent>
	</TheSheet>
</template>
