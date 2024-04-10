<script setup lang="ts">


const formData = ref({
	email: "",
	password: "",
});

</script>

<template>
	<TheCard class="w-80 border-0">
		<CardHeader>
			<CardTitle class="text-center">
				Connexion
			</CardTitle>
		</CardHeader>
		<CardContent>
			<CardDescription class="mb-6">
				Connectez-vous pour accéder à votre compte.
			</CardDescription>
			<form class="flex flex-col gap-4">
				<TheInput
					v-model="formData.email"
					type="email"
					placeholder="Adresse email"
				/>
				<TheInput
					v-model="formData.password"
					type="password"
					placeholder="Mot de passe"
				/>
				<TheButton
					type="submit"
					class="w-full"
				>
					Connexion
				</TheButton>
			</form>
		</CardContent>
		<CardFooter>
			<RouterLink
				to="/register"
				class="text-blue-500 hover:underline"
			>
				Pas encore de compte ? Inscrivez-vous
			</RouterLink>
		</CardFooter>
	</TheCard>
</template>
