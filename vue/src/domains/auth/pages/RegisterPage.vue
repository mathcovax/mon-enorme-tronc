<script setup lang="ts">
async function signin(){
	try {
		// Signin
		console.log("Signin");
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
							{{ $t("page.register.title") }}
						</h1>

						<p class="text-balance text-muted-foreground">
							{{ $t("page.register.subtitle") }}
						</p>
					</div>

					<div class="grid gap-4">
						<div class="grid grid-cols-2 gap-4">
							<div class="grid gap-2">
								<TheLabel for="lastname">
									{{ $t("page.register.lastname") }}
								</TheLabel>

								<TheInput
									id="lastname"
									type="text"
									placeholder="Doe"
									required
								/>
							</div>

							<div class="grid gap-2">
								<TheLabel for="fistname">
									{{ $t("page.register.fistname") }}
								</TheLabel>

								<TheInput
									id="fistname"
									type="text"
									placeholder="John"
									required
								/>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="grid gap-2">
								<TheLabel for="age">
									{{ $t("page.register.age") }}
								</TheLabel>

								<TheInput
									id="age"
									type="number"
									placeholder="18"
									required
								/>
							</div>

							<div class="grid gap-2">
								<TheLabel for="country">
									{{ $t("page.register.country") }}
								</TheLabel>

								<TheInput
									id="country"
									type="text"
									placeholder="England"
									required
								/>
							</div>
						</div>

						<div class="grid gap-2">
							<TheLabel for="address">
								{{ $t("page.register.address.label") }}
							</TheLabel>

							<div class="relative w-full max-w-sm items-center">
								<TheInput
									id="address"
									type="text"
									:placeholder="$t('page.register.address.placeholder')"
									class="pl-10"
								/>

								<span class="absolute px-2 start-0 inset-y-0 flex items-center justify-center opacity-50">
									<TheIcon
										icon="map-marker"
										size="2xl"
									/>
								</span>
							</div>
						</div>

						<div class="flex items-center space-x-2">
							<TheCheckbox id="terms" />

							<TheLabel for="terms">
								{{ $t("page.register.terms") }}
							</TheLabel>
						</div>

						<TheButton
							@click="signin"
							class="w-full"
						>
							{{ $t("page.register.buttonText") }}
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
