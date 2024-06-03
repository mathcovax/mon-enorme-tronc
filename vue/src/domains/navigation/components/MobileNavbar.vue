<script setup lang="ts">
import { useGetNavigationBar } from "../composables/useGetNavigationBar";

const { PRODUCT_CATEGORY } = routerPageName;

const { items, getNavbarItems } = useGetNavigationBar();

getNavbarItems();
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

				<template
					v-for="item in items"
					:key="item.type"
				>
					<TheAccordion
						v-if="item.type === 'PARENT_CATEGORY'"
						type="single"
						collapsible
						class="w-full"
					>
						<AccordionItem 
							class="border-b-0"
							:value="item.parentCategoryName"
						>
							<AccordionTrigger class="hover:no-underline	">
								{{ item.parentCategoryName }}
							</AccordionTrigger>

							<AccordionContent>
								<ul class="flex flex-col gap-2">
									<li
										v-for="category in item.categories"
										:key="category.categoryName"
										class="px-3 py-2 rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground"
									>
										<RouterLink
											:to="{ name: PRODUCT_CATEGORY, params: { categoryName: category.categoryName } }"
											class="flex items-center gap-4"
										>
											<img
												:src="category.categoryImageUrl"
												class="w-24 aspect-video object-cover"
											>
											{{ category.categoryName }}
										</RouterLink>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
					</TheAccordion>

					<RouterLink
						v-else-if="item.type === 'CATEGORY'"
						:to="{ name: PRODUCT_CATEGORY, params: { categoryName: item.categoryName } }"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
					>
						{{ item.categoryName }}
					</RouterLink>

					<RouterLink
						v-else
						:to="item.url"
						class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
					>
						{{ item.title }}
					</RouterLink>
				</template>
			</nav>
		</SheetContent>
	</TheSheet>
</template>
