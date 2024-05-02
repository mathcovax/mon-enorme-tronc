<script setup lang="ts">
const { values, Form: SignForm, checkForm } = useFormBuilder({
	lastname: {
		cols: 6,
		type: "string",
		label: "Nom",
		zodSchema: zod.string({ message: "Champ obligatoire" })
			.min(2, "Doit faire au moins 2 caractères")
			.max(255, "Doit faire au plus 255 caractères"),
	},
	fistname: {
		cols: 6,
		type: "string",
		label: "Prénom",
		zodSchema: zod.string({ message: "Champ obligatoire" })
			.min(2, "Doit faire au moins 2 caractères")
			.max(255, "Doit faire au plus 255 caractères"),
	},
	age: {
		cols: 6,
		type: "number",
		label: "Âge",
		zodSchema: zod.number({ message: "Champ obligatoire" })
			.min(18, "Vous devez avoir au moins 18 ans"),
	},
	country: {
		cols: 6,
		type: "string",
		label: "Pays",
		zodSchema: zod.string({ message: "Champ obligatoire" })
			.min(2, "Dois faire au moins 2 caractères")
			.max(255, "Doit faire au plus 255 caractères"),
	},
	address: {
		type: "string",
		label: "Adresse",
		zodSchema: zod.string({ message: "Champ obligatoire" }).min(2).max(255),
	},
});

const terms = ref(false);

const signup = async () => {
	const isValid = await checkForm();

	if (!isValid) {
		return;
	}

	if (!terms.value) {
		return alert("Vous devez accepter les conditions d'utilisation");
	}

	const data = {
		...values,
		terms: terms.value,
	};

	console.log(data);
};
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

					<SignForm />

					<div class="flex items-center space-x-2">
						<TheCheckbox
							:checked="terms"
							@update:checked="terms = $event"
							id="terms"
						/>

						<TheLabel for="terms">
							{{ $t("page.register.terms") }}
						</TheLabel>
					</div>

					<TheButton
						@click="signup"
						class="w-full"
					>
						{{ $t("page.register.buttonText") }}
					</TheButton>
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
