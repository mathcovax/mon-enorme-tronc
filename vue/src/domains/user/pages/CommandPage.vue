<script setup lang="ts">
import CommandSteps from "../components/CommandSteps.vue";
import { useUserCommandForm } from "../composables/useUserCommandForm";
import { useGetCart } from "../composables/useGetCart";

const $pt = usePageTranslate();

const user = useUserStore().user;
const { cart } = useGetCart();

const {
	UserCommandForm,
	//checkUserCommandForm,
} = useUserCommandForm(user?.id);

function submitForm() {
	// const formFields = await checkUserCommandForm();

	// if (!formFields) {
	// 	return;
	// }

	// await duploTo.enriched
	// 	.patch(
	// 		"/user",
	// 		{
	// 			lastname: formFields.lastname,
	// 			firstname: formFields.firstname,
	// 			address: formFields.address,
	// 		},
	// 	)
	// 	.result;

	step.value = 2;
}

const products = ref(cart);

function submitPayement() {
	step.value = 4;
}

const step = ref(1);
</script>

<template>
	<section class="h-screen-no-header">
		<div class="container h-[calc(100%-3rem)] mt-12 lg:mt-16 flex flex-col gap-12">
			<h1 class="text-2xl lg:text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<div class="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
				<aside class="mb-12 md:mb-0 rounded shadow p-4">
					<CommandSteps :step="step" />
				</aside>

				<div
					class="h-full flex flex-col gap-6"
				>
					<div
						v-if="step > 1 && step < 4"
						@click="step--"
						class="cursor-pointer"
					>
						<TheIcon
							icon="arrow-left"
							class="inline-block"
						/>
						{{ $t("button.back") }}
					</div>

					<template v-if="step === 1">
						<h2 class="text-xl lg:text-2xl font-bold mb-4">
							{{ $pt("stepTitle.address") }}
						</h2>

						<UserCommandForm
							@submit="submitForm"
						>
							<PrimaryButton
								type="submit"
								class="col-span-12"
							>
								{{ $t("button.validate") }}
							</PrimaryButton>
						</UserCommandForm>
					</template>

					<template v-if="step === 2">
						<h2 class="text-xl lg:text-2xl font-bold mb-4">
							{{ $pt("stepTitle.cart") }}
						</h2>

						<div class="flex flex-col gap-4">
							<div
								v-for="product in products"
								:key="product.productSheetId"
								class="flex items-center gap-4"
							>
								{{ product.name }}
							</div>

							<SecondaryButton
								type="submit"
								class="col-span-12"
							>
								{{ $t("button.edit") }}
							</SecondaryButton>

							<PrimaryButton
								type="submit"
								class="col-span-12"
								@click="step = 3"
							>
								{{ $t("button.validate") }}
							</PrimaryButton>
						</div>
					</template>

					<template v-if="step === 3">
						<h2 class="text-xl lg:text-2xl font-bold mb-4">
							{{ $pt("stepTitle.payment") }}
						</h2>

						<PrimaryButton
							type="submit"
							class="col-span-12"
							@click="submitPayement"
						>
							{{ $t("button.pay") }}
						</PrimaryButton>
					</template>

					<template v-if="step === 4">
						<h2 class="text-xl lg:text-2xl font-bold mb-4">
							{{ $pt("stepTitle.success") }}
						</h2>

						<div class="flex-1 flex flex-col gap-4 justify-center items-center">
							<TheIcon
								icon="check-circle"
								class="w-24 h-24 text-[96px] flex items-center justify-center "
							/>

							<p>
								{{ $pt("step.successMessage") }}
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
						</div>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>
