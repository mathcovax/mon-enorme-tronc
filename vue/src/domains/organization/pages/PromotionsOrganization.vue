<script setup lang="ts">
import type { Promotion } from "@/lib/utils";
import { useGetOrganizationPromotions } from "../composables/useGetOrganizationPromotions";
import { usePromotionAddForm } from "../composables/usePromotionAddForm";

const $pt = usePageTranslate();
const params = useRouteParams({ organizationId: zod.string() });
const errorDateMessage = ref("");

const { promotions, getOrganizationPromotions } = useGetOrganizationPromotions(params.value.organizationId);

const {
	FormPromotionAdd,
	checkFormPromotionAdd,
	resetFormPromotionAdd
} = usePromotionAddForm(params.value.organizationId);

const currentPage = ref(0);
const cols: BigTableColDef<Promotion>[] = [
	{
		title: $pt("table.col.productSheetName"),
		getter: i => i.productSheet?.name ? i.productSheet.name : ""
	},
	{
		title: $pt("table.col.percentage"),
		slotName: "percentage",
		getter: i => i.percentage
	},
	{
		title: $pt("table.col.startDate"),
		slotName: "startDate",
		getter: i => i.startDate
	},
	{
		title: $pt("table.col.endDate"),
		slotName: "endDate",
		getter: i => i.endDate
	},
	{
		title: $pt("table.col.actions"),
		slotName: "actions", 
		cols: 2
	}
];

function next() {
	if (promotions.value.length < 10) {
		return;
	}

	getOrganizationPromotions(currentPage.value += 1);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}

	getOrganizationPromotions(currentPage.value -= 1);
}

async function submit() {
	const formFields = await checkFormPromotionAdd();

	if (!formFields) {
		return;
	}

	if (formFields.startDate > formFields.endDate) {
		errorDateMessage.value = "La date de début doit être inférieure à la date de fin.";
		return;
	} else if (formFields.startDate.getTime() === formFields.endDate.getTime()) {
		errorDateMessage.value = "La date de début doit être différente de la date de fin.";
		return;
	} else if ((formFields.startDate || formFields.endDate) < new Date(Date.now())) {
		errorDateMessage.value = "La date de début et la date de fin doivent être supérieures à la date actuelle.";
		return;
	} else {
		errorDateMessage.value = "";
	}

	duploTo.enriched
		.post(
			"/product-sheet/{productSheetId}/promotion",
			{
				percentage: formFields.percentage / 100,
				startDate: formFields.startDate,
				endDate: formFields.endDate,
				organizationId: params.value.organizationId
			},
			{ params: { productSheetId: formFields.productSheet } }
		)
		.info("promotion.created", () => {
			resetFormPromotionAdd();
			getOrganizationPromotions(currentPage.value);
		});
}

function deletePromotion(promotion: Promotion) {
	if (!promotion.productSheet?.id) {
		return;
	}
	duploTo.enriched
		.delete(
			"/product-sheet/{productSheetId}/promotion/{promotionId}",
			{ params: { productSheetId: promotion.productSheet.id, promotionId: promotion.id } }		
		)	
		.info("promotion.deleted", () => {
			//popup.value?.close();
			getOrganizationPromotions(currentPage.value);
		});
}

getOrganizationPromotions(currentPage.value);
</script>
<template>
	<section class="h-screen-no-header">
		<div 
			class="container h-[calc(100%-3rem)] mt-12 lg:mt-16 flex flex-col gap-12"
		>
			<h1 class="text-2xl font-bold lg:text-3xl">
				{{ $pt("title") }}
			</h1>

			<div 
				class="flex flex-col items-center w-full gap-6 p-6"
			>
				<FormPromotionAdd
					@submit="submit"
					class="max-w-[500px] w-[80%]"
				>
					<small
						v-if="errorDateMessage.length > 0"
						class="col-span-12 text-center text-red-500"
					>{{ errorDateMessage }}</small>

					<PrimaryButton
						type="submit"
						class="col-span-12"
					>
						{{ $t("button.validate") }}
					</PrimaryButton>
				</FormPromotionAdd>

				<BigTable
					:items="promotions"
					:cols="cols"
					:current-page="currentPage + 1"
					:action-label="$pt('table.col.actions')"
					@click-next="next"
					@click-previous="previous"
				>
					<template #percentage="{item}">
						{{ $pt("table.percentage", { value: item.percentage * 100 }) }}
					</template>

					<template #startDate="{item}">
						{{ $d(item.startDate) }}
					</template>

					<template #endDate="{item}">
						{{ $d(item.endDate) }}
					</template>

					<template #actions="{item}">
						<WithValidation
							:title="$pt('popup.title')"
							:content="$pt('popup.content')"
							class="col-span-4"
							@validate="deletePromotion(item)"
						>
							<SecondaryButton>
								<TheIcon icon="delete" />
							</SecondaryButton>
						</WithValidation>
					</template>
				</BigTable>
			</div>
		</div>
	</section>
</template>
