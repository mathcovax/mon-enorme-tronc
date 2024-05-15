<script setup lang="ts">
import { 
	Home,
	LineChart,
	Package,
	ShoppingCart,
	Users 
} from "lucide-vue-next";
</script>

<template>
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-24 justify-center items-center border-b px-4 lg:px-6">
				<RouterLink
					to="/organization"
					class="flex items-center gap-2 text-center font-semibold"
				>
					<span>Mon organisation</span>
				</RouterLink>
			</div>

			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					<RouterLink
						to="#"
						class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<Home class="h-4 w-4" />
						Dashboard
					</RouterLink>

					<RouterLink
						to="#"
						class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<ShoppingCart class="h-4 w-4" />
						Orders
					</RouterLink>

					<RouterLink
						to="#"
						class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
					>
						<Package class="h-4 w-4" />
						Products
					</RouterLink>

					<RouterLink
						to="#"
						class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<Users class="h-4 w-4" />
						Customers
					</RouterLink>

					<RouterLink
						to="#"
						class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<LineChart class="h-4 w-4" />
						Analytics
					</RouterLink>
				</nav>
			</div>
		</div>
	</div>
</template>

