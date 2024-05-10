<script setup lang="ts">
export interface BreadcrumbItem {
	title: string;
	href?: string;
}

defineProps<{
	breadcrumbItems: BreadcrumbItem[];
}>();
</script>

<template>
	<section>
		<TheBreadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink>
						<RouterLink to="/">
							Accueil
						</RouterLink>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				<BreadcrumbItem
					v-for="item in breadcrumbItems"
					:key="item.title"
				>
					<template v-if="item.href">
						<BreadcrumbLink
							as-child
							class="max-w-20 truncate md:max-w-none"
						>
							<RouterLink :to="item.href">
								{{ item.title }}
							</RouterLink>
						</BreadcrumbLink>

						<BreadcrumbSeparator />
					</template>

					<BreadcrumbItem
						v-else
						class="max-w-20 truncate md:max-w-none"
					>
						<BreadcrumbPage>{{ item.title }}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbItem>
			</BreadcrumbList>
		</TheBreadcrumb>
	</section>
</template>
