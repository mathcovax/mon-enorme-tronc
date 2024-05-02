export function useSignUpForm(){

	const suggestedAddresses = ref([]);

	const { Form, checkForm } = useFormBuilder({
		lastname: {
			cols: 6,
			type: "string",
			label: $t("page.register.lastname"),
			zodSchema: zod.string({ message: $t("page.register.rules.required") })
				.min(2, $t("page.register.rules.minLength"))
				.max(255, $t("page.register.rules.maxLength")),
		},
		fistname: {
			cols: 6,
			type: "string",
			label: $t("page.register.firstname"),
			zodSchema: zod.string({ message: $t("page.register.rules.required") })
				.min(2, $t("page.register.rules.minLength"))
				.max(255, $t("page.register.rules.maxLength")),
		},
		birthDate: {
			cols: 6,
			type: "number",
			label: $t("page.register.birthDate"),
			zodSchema: zod.number({ message: $t("page.register.rules.required") })
				.min(18, $t("page.register.rules.minAge"))
				.max(130, $t("page.register.rules.maxAge"))
		},
		country: {
			cols: 6,
			type: "string",
			label: $t("page.register.country"),
			zodSchema: zod.string({ message: $t("page.register.rules.required") })
				.min(2, $t("page.register.rules.minLength"))
				.max(255, $t("page.register.rules.maxLength")),
		},
		address: computed(() => ({
			type: "combo",
			items: suggestedAddresses.value,
			placeholder: $t("page.register.address.placeholder"),
			emptyLabel: $t("page.register.address.emptyLabel"),
			defaultLabel: $t("page.register.address.defaultLabel"),
			label: $t("page.register.address.label"),
			zodSchema: zod.string({ message: $t("page.register.rules.required") }).min(2).max(255),
		})),
	});

	return {
		SignUpForm: Form,
		checkSignUpForm: checkForm,
	};
}
