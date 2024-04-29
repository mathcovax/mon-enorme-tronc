<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app as firebaseApp } from "@/lib/firebase";
import { effect } from "vue";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

async function googleSign(){
	try {
		const result = await signInWithPopup(auth, provider);
		const googleIdToken = await result.user.getIdToken();

		await duploTo.enriched.post("/login", googleIdToken)
			.info("user.login", accessToken => {
				console.log(accessToken);
			})
			.result;	
	}
	catch { 
		// Handle error
	}
}

const test = ref("test");

const { values, Form: SignForm, checkForm } = useFormBuilder([
	{
		type: "string",
		name: "test",
		defaultValue: "toto",
		zodSchema: zod.string().transform((v) => [v]),
		label: computed(() => test.value),
		clos: 6,
	},
	{
		type: "string",
		name: "te",
		defaultValue: "22",
		zodSchema: zod.string({ message: "n'est pas une string" }),
		clos: 6,
	},
	{
		type: "number",
		name: "num",
		defaultValue: 1,
		zodSchema: zod.number({ message: "n'est pas un nombre" }),
		clos: 6,
	},
]);

setTimeout(async () => {
	console.log(await checkForm());
}, 1000);

effect(() => {
	console.log(
		values.test.value, values.te.value, values.num.value
	);
});
</script>

<template>
	<section class="h-screen-no-header flex justify-center items-center">
		<div class="w-full h-full flex items-center justify-center lg:grid lg:items-stretch lg:justify-normal lg:grid-cols-2">
			<div class="flex items-center justify-center py-12">
				<div class="mx-auto grid w-[350px] gap-6">
					<div class="grid gap-2 text-center">
						<h1 class="text-3xl font-bold">
							{{ $t("page.login.title") }}
						</h1>
						<p class="text-balance text-muted-foreground">
							{{ $t("page.login.subtitle") }}
						</p>
					</div>
					<div class="grid gap-4">
						<TheButton
							@click="googleSign"
							class="w-full"
						>
							{{ $t("page.login.buttonText") }}
						</TheButton>
					</div>
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

		<SignForm />
	</section>
</template>
