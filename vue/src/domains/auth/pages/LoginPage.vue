<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app as firebaseApp } from "@/lib/firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);
const router = useRouter();

async function googleSign(){
	try {
		const result = await signInWithPopup(auth, provider);
		const googleIdToken = await result.user.getIdToken();

		await duploTo.enriched.post("/login", googleIdToken)
			.info("user.logged", accessToken => {
				console.log(accessToken);
				router.push({ name: "customer-register" });
			})
			.info("user.register", () => {
				console.log("Redirect to register page");
			})
			.result;	
	}
	catch { 
		// Handle error
	}
}
</script>

<template>
	<section class="flex items-center justify-center h-screen-no-header">
		<div class="flex items-center justify-center w-full h-full lg:grid lg:items-stretch lg:justify-normal lg:grid-cols-2">
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
						<PrimaryButton
							@click="googleSign"
							class="w-full"
						>
							{{ $t("page.login.buttonText") }}
						</PrimaryButton>
					</div>
				</div>
			</div>

			<div class="hidden bg-muted lg:block">
				<img
					src="https://via.placeholder.com/250"
					alt="Image"
					class="object-cover w-full h-full"
				>
			</div>
		</div>
	</section>
</template>
