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

const { Form, values } = useFormBuilder({
	field1: {
		type: "text",
		defaultValue: "test",
	},
	field2: {
		type: "checkbox",
		defaultValue: true,
		label: "test",
		desc: "testete feedecefef efefe ec ez fezsf z fefes fgfez gzzegsgsr ggs ",
	},
	field3: {
		type: "combo",
		label: "test",
		items: [],
		placeholder: "",
		emptyLabel: "",
		textButton: "test",
	},
	field4: {
		type: "select",
		label: "ok",
		items: [{ label: "te", value: "eeee" }],
	},
	field5: {
		type: "textarea",
		defaultValue: "test",
	},
});

effect(() => {
	console.log(values.field1.value, values.field2.value, values.field3.value, values.field4.value, values.field5.value);
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

					<Form />
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
