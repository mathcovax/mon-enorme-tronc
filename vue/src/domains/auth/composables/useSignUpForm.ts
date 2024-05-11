import type { ItemComboBox } from "@/composables/useFormBuilder/_inputs/ComboBoxInput";

export function useSignUpForm(){

	const timestamp18year = 568036800000;
	const suggestedAddresses = ref<ItemComboBox[]>([]);

	function onSearchAddress(address: string){
		duploTo.enriched.
			get("/geocoder", { query: { address } })
			.s((addresses) => {
				if(addresses.length === 0) {
					return;
				}
				
				suggestedAddresses.value = addresses.map(
					(address) => ({ label: address, identifier: address })
				);
			});	
	}

	const { Form, checkForm } = useFormBuilder({
		lastname: {
			cols: 6,
			type: "text",
			label: $t("page.register.lastname"),
			zodSchema: zod.string({ message: $t("page.register.rules.required") })
				.min(2, $t("page.register.rules.minLength"))
				.max(255, $t("page.register.rules.maxLength")),
		},
		fistname: {
			cols: 6,
			type: "text",
			label: $t("page.register.firstname"),
			zodSchema: zod.string({ message: $t("page.register.rules.required") })
				.min(2, $t("page.register.rules.minLength"))
				.max(255, $t("page.register.rules.maxLength")),
		},
		dateOfBirth: {
			type: "date",
			label: $t("page.register.birthDate"),
			zodSchema: zod.coerce.date({ message: $t("page.register.rules.required") })
				.refine(
					(userDateOfBirth) => Date.now() - userDateOfBirth.getTime() >= timestamp18year, 
					{ message: $t("page.register.rules.minAge") }
				)
		},
		address: computed(() => ({
			type: "combo",
			items: suggestedAddresses.value,
			placeholder: $t("page.register.address.placeholder"),
			emptyLabel: $t("page.register.address.emptyLabel"),
			defaultLabel: $t("page.register.address.defaultLabel"),
			label: $t("page.register.address.label"),
			zodSchema: zod.object(
				{ label: zod.string() }, 
				{ message: $t("page.register.rules.required") }
			),
			textButton: $t("page.register.address.placeholder"),
			onUpdateSearchTerm: onSearchAddress
		})),
		terms: {
			type: "checkbox",
			desc: $t("page.register.terms"),
			zodSchema: zod.literal(true, { message: $t("page.register.rules.terms") }),
		}
	});

	return {
		SignUpForm: Form,
		checkSignUpForm: checkForm,
	};
}
