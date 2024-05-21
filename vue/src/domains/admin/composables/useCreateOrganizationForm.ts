import type { ItemComboBox } from "@/composables/useFormBuilder/_inputs/ComboBoxInput";

export function useCreateOrganizationForm() {
	const $pt = usePageTranslate();
	const suggestedUser = ref<ItemComboBox[]>([]);

	function onSearchUser(userEmail: string) {
		duploTo.enriched.
			get("/users", { query: { email: userEmail } })
			.s((users) => {
				suggestedUser.value = users.map(
					(user) => ({ label: user.email, identifier: user.id })
				);
			});	
	}

	const { Form, checkForm, resetForm } = useFormBuilder({
		name: {
			type: "text",
			label: $pt("form.name.label"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.max(255, { message: $t("form.rule.maxLength", { value: 255 }) })
				.min(2, { message: $t("form.rule.minLength", { value: 2 }) })
		},
		ownerId: computed(() => ({
			type: "combo",
			label: $pt("form.owner.label"),
			textButton: $pt("form.owner.textButton"),
			placeholder: $pt("form.owner.placeholder"),
			emptyLabel: $t("label.empty"),
			items: suggestedUser.value,
			onUpdateSearchTerm: onSearchUser,
			zodSchema: zod.object(
				{ identifier: zod.string() }, 
				{ message: $t("form.rule.required") }
			).transform(item => item.identifier),
		})),
	});

	return {
		CreateOrganizationForm: Form,
		checkCreateOrganizationForm: checkForm,
		resetCreateOrganizationForm: resetForm,
	};
}
