<script setup lang="ts">
import { useSignUpForm } from "../composables/useSignUpForm"; 

const { SignUpForm, checkSignUpForm } = useSignUpForm();

const { query: { fireBaseIdToken } } = useRoute();
const router = useRouter();
const { setAccessToken, fetchUserValue } = useUserStore();

async function submit() {
	const formFields = await checkSignUpForm();

	if (!formFields) {
		return;
	}

	await duploTo.enriched.post(
		"/register", 
		{
			fireBaseIdToken: fireBaseIdToken as string,
			firstname: formFields.fistname,
			lastname: formFields.lastname,
			address: formFields.address.label,
			dateOfBirth: new Date(formFields.dateOfBirth)
		}
	)
		.info("user.registered", (accessToken) => {
			setAccessToken(accessToken);
			fetchUserValue();
			router.push({ name: "home" });
		})
		.result;
}

onMounted(async () => {
	if(typeof fireBaseIdToken !== "string"){
		router.push({ name: "login" });
	}
});
</script>

<template>
	<section class="h-screen-no-header flex justify-center items-center">
		<div class="w-full h-full flex items-center justify-center lg:grid lg:items-stretch lg:justify-normal lg:grid-cols-2">
			<div class="flex items-center justify-center py-12">
				<div class="mx-auto grid w-[350px] gap-6">
					<div class="grid gap-2 text-center">
						<h1 class="text-3xl font-bold">
							{{ $t("page.register.title") }}
						</h1>

						<p class="text-balance text-muted-foreground">
							{{ $t("page.register.subtitle") }}
						</p>
					</div>

					<SignUpForm @submit="submit">
						<div class="flex items-center space-x-2 col-span-12">
							<PrimaryButton
								type="submit"
								class="w-full"
							>
								{{ $t("page.register.buttonText") }}
							</PrimaryButton>
						</div>
					</SignUpForm>
				</div>
			</div>

			<div class="hidden bg-muted lg:block">
				<img
					src="https://via.placeholder.com/250"
					alt="Image"
					class="h-full w-full object-cover"
				>
			</div>
		</div>
	</section>
</template>
