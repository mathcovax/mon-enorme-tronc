<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app as firebaseApp } from "@/lib/firebase";
import { duploTo as dt } from "@/lib/duploTo";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

async function googleSign(){
	try {
		const result = await signInWithPopup(auth, provider);
		const googleIdToken = await result.user.getIdToken();

		await dt.enriched.post("/login", googleIdToken)
			.code(200, accessToken => {
				console.log(accessToken);
			})
			.result;	
	}
	catch { 
		// Handle error
	}
}
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
	</section>
</template>
