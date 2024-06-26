<script setup lang="ts">
import type { NavigationBar } from "@/lib/utils";

interface Props {
	navigationItems: NavigationBar
}

defineProps<Props>();

const { CATEGORY_PAGE } = routerPageName;
</script>

<template>
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem
				v-for="item in navigationItems"
				:key="item.type"
			>
				<template v-if="item.type === 'PARENT_CATEGORY'">
					<NavigationMenuTrigger>{{ item.parentCategoryName }}</NavigationMenuTrigger>

					<NavigationMenuContent>
						<ul class="w-[calc(100vw-1.05rem)] p-4 lg:p-6 flex flex-col lg:flex-row lg:flex-wrap gap-4 lg:gap-6">
							<li
								v-for="category in item.categories"
								:key="category.categoryName"
							>
								<NavigationMenuLink 
									as-child
								>
									<RouterLink
										class="h-full w-full p-4 lg:p-6 flex gap-4 lg:gap-0 lg:flex-col lg:justify-end items-center lg:items-start rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
										:to="{ name: CATEGORY_PAGE, params: { categoryName: category.categoryName } }"
									>
										<img
											:src="category.categoryImageUrl"
											class="w-44 lg:w-64 aspect-video object-cover"
										>

										<div class="mb-2 mt-4 text-lg font-medium">
											{{ category.categoryName }}
										</div>
									</RouterLink>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</template>

				<RouterLink
					v-else-if="item.type === 'CATEGORY'"
					:to="{ name: CATEGORY_PAGE, params: { categoryName: item.categoryName } }"
					class="inline-block rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
				>
					{{ item.categoryName }}
				</RouterLink>

				<RouterLink
					v-else
					:to="item.url"
					class="inline-block rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
				>
					{{ item.title }}
				</RouterLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
</template> 
