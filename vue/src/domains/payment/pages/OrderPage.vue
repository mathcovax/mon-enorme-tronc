<script setup lang="ts">
import OrderSteps from "../components/OrderSteps.vue";
import OrderCard from "../components/OrderCard.vue";
import { useUserCommandForm } from "../../user/composables/useUserCommandForm";
import { useGetCart } from "../../user/composables/useGetCart";

const $pt = usePageTranslate();

const { cart } = useGetCart();
const step = ref(1);

interface CommandInfo {
	firstname: string;
	lastname: string;
	address: string;
}

const commandInfos = ref<CommandInfo | undefined>();

const {
	UserCommandForm,
	checkUserCommandForm,
} = useUserCommandForm();

async function submitForm() {
	const formFields = await checkUserCommandForm();

	if (!formFields) {
		return;
	}

	commandInfos.value = formFields;

	step.value = 2;
}

const products = ref(cart);

function submitPayment() {
	if (!commandInfos.value) {
		return;
	}

	duploTo.enriched
		.post(
			"/make-command",
			{
				firstname: commandInfos.value.firstname,
				lastname: commandInfos.value.lastname,
				address: commandInfos.value.address,
			}
		)
		.info("session", (data) => {
			window.location.href = data.sessionUrl;
		})
		.result;
}

const totalPriceCart = computed(() => {
	return products.value.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2);
});

</script>

<template>
	<section class="h-screen-no-header">
		<div class="container h-[calc(100%-3rem)] mt-12 lg:mt-16 flex flex-col gap-12">
			<h1 class="text-2xl font-bold lg:text-3xl">
				{{ $pt("title") }}
			</h1>

			<div class="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
				<aside class="p-4 mb-12 rounded shadow md:mb-0">
					<OrderSteps
						:step="step"
						@update:step="v => step = v"
					/>
				</aside>

				<div
					class="flex flex-col h-full gap-6"
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
						<h2 class="mb-4 text-xl font-bold lg:text-2xl">
							{{ $pt("stepTitle.orderInfos") }}
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
						<h2 class="mb-4 text-xl font-bold lg:text-2xl">
							{{ $pt("stepTitle.cart") }}
						</h2>

						<div class="flex flex-col gap-4">
							<div
								v-for="product in products"
								:key="product.productSheetId"
							>	
								<OrderCard
									:article="product"
								/>
							</div>

							<div
								class="flex justify-end col-span-12"
							>
								<span
									class="p-2 text-right bg-gray-100 border border-gray-200 rounded-sm"
								>
									{{ $pt("step.cart.total", { value: totalPriceCart }) }}
								</span>
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
						<h2 class="mb-4 text-xl font-bold lg:text-2xl">
							{{ $pt("stepTitle.payment") }}
						</h2>

						<PrimaryButton
							type="submit"
							class="col-span-12"
							@click="submitPayment"
						>
							{{ $t("button.pay") }}
						</PrimaryButton>
					</template>

					<template v-if="step === 4">
						<h2 class="mb-4 text-xl font-bold lg:text-2xl">
							{{ $pt("stepTitle.success") }}
						</h2>

						<div class="flex flex-col items-center justify-center flex-1 gap-4">
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
