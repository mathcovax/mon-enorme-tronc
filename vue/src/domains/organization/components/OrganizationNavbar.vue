<script setup lang="ts">

</script>

<template>
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-24 justify-center items-center border-b px-4 lg:px-6">
				<RouterLink
					to="/organization"
					class="flex items-center gap-2 text-center font-semibold"
				>
					<span>{{ $t("layout.organization.title") }}</span>
				</RouterLink>
			</div>

			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					<RouterLink
						to="#"
						class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<TheIcon
							icon="home-outline"
							size="2xl"
						/>
						{{ $t("layout.organization.nav.dashboard") }}
					</RouterLink>

					<RouterLink
						to="#"
						class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<TheIcon
							icon="cart-outline"
							size="2xl"
						/>
						{{ $t("layout.organization.nav.orders") }}
					</RouterLink>

					<RouterLink
						to="#"
						class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
					>
						<TheIcon
							icon="package-variant-closed"
							size="2xl"
						/>
						{{ $t("layout.organization.nav.products") }}
					</RouterLink>

					<RouterLink
						to="#"
						class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<TheIcon
							icon="account"
							size="2xl"
						/>
						{{ $t("layout.organization.nav.customers") }}
					</RouterLink>

					<RouterLink
						to="#"
						class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<TheIcon
							icon="chart-line"
							size="2xl"
						/>
						{{ $t("layout.organization.nav.analytics") }}
					</RouterLink>
				</nav>
			</div>
		</div>
	</div>
</template>

