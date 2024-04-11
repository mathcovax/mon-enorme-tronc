<script setup lang="ts">


const formData = ref({
	email: "",
	password: "",
});

</script>
<template>
	<div class="w-full h-full flex items-center justify-center lg:grid lg:items-stretch lg:justify-normal lg:grid-cols-2">
		<div class="flex items-center justify-center py-12">
			<div class="mx-auto grid w-[350px] gap-6">
				<div class="grid gap-2 text-center">
					<h1 class="text-3xl font-bold">
						Connexion
					</h1>
					<p class="text-balance text-muted-foreground">
						Connectez-vous pour accéder à votre compte.
					</p>
				</div>
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<TheInput
							v-model="formData.email"
							type="email"
							placeholder="Adresse email"
						/>
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Mot de passe</Label>
							<a
								href="/forgot-password"
								class="ml-auto inline-block text-sm underline"
							>
								Mot de passe oublié ?
							</a>
						</div>
						<TheInput
							v-model="formData.password"
							type="password"
							placeholder="Mot de passe"
						/>
					</div>
					<TheButton
						type="submit"
						class="w-full"
					>
						Se connecter
					</TheButton>
					<TheButton
						variant="outline"
						class="w-full"
					>
						Se connecter avec Google
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
</template>
