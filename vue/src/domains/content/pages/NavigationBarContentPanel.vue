<script setup lang="ts">
import type { NavigationItem } from "@/lib/utils";
import { useNavigationItemForm } from "../composables/useNavigationItemForm";
import PrimaryButton from "@/components/PrimaryButton.vue";

interface NavigationItemFormDocument {
	editing: boolean
	currentNavigationItem?: NavigationItem
	navigationItemForm: ReturnType<typeof useNavigationItemForm>
}
const navigationItemFormCollection = ref<NavigationItemFormDocument[]>([]);

duploTo.enriched
	.get("/navigation-items")
	.info("navigationItems", (data) => {
		data.forEach(ni => {
			const navigationItemForm = useNavigationItemForm();
			navigationItemForm.NavigationItemFormValues.type.value = ni.type;
			navigationItemForm.NavigationItemFormValues.title.value = ni.title;
			navigationItemForm.NavigationItemFormValues.priority.value = ni.priority;

			navigationItemFormCollection.value.push({
				editing: false,
				navigationItemForm,
				currentNavigationItem: ni
			});
		});
	});

function addNavigationItemForm() {
	navigationItemFormCollection.value.forEach(d => d.editing = false);
	navigationItemFormCollection.value.push({
		editing: true,
		navigationItemForm: useNavigationItemForm()
	});
}

const inEditing = computed(
	() => !!navigationItemFormCollection.value.find(i => i.editing === true)
);
</script>

<template>
	<div class="w-full flex flex-col items-center p-6 gap-10">
		<div
			v-for="{editing, navigationItemForm} of navigationItemFormCollection"
			:key="navigationItemForm.NavigationItemFormId"
			class="max-w-[500px] w-[80%]"
		>
			<div
				v-if="editing"
				class="w-full"
			>
				<component
					:is="navigationItemForm.NavigationItemForm"
					class="w-full"
				>
					<PrimaryButton class="col-span-12">
						{{ $t("button.save") }}
					</primarybutton>
				</component>
			</div>
			

			<div
				v-else
				class="w-full"
			>
				{{ navigationItemForm.NavigationItemFormValues }}
				<SecondaryButton :disabled="inEditing">
					<TheIcon icon="pen" />
				</SecondaryButton>
			</div>
		</div>

		<PrimaryButton
			@click="addNavigationItemForm"
			:disabled="navigationItemFormCollection.length > 9 || inEditing"
		>
			<TheIcon icon="plus" />
		</PrimaryButton>
	</div>
</template>
