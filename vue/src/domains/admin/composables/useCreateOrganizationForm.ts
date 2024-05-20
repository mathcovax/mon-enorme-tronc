import type { ItemComboBox } from "@/composables/useFormBuilder/_inputs/ComboBoxInput";

export function useCreateOrganizationForm() {
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
			label: $t("page.createOrganization.form.name.label"),
			defaultValue: "",
			zodSchema: zod.string({ message: $t("page.createOrganization.form.required") })
				.max(255, { message: $t("page.createOrganization.form.name.maxLength") })
				.min(2, { message: $t("page.createOrganization.form.name.minLength") })
		},
		ownerId: computed(() => ({
			type: "combo",
			label: $t("page.createOrganization.form.owner.label"),
			textButton: $t("page.createOrganization.form.owner.textButton"),
			placeholder: $t("page.createOrganization.form.owner.placeholder"),
			emptyLabel: $t("page.createOrganization.form.owner.emptyLabel"),
			items: suggestedUser.value,
			onUpdateSearchTerm: onSearchUser,
			zodSchema: zod.object(
				{ identifier: zod.string() }, 
				{ message: $t("page.createOrganization.form.required") }
			).transform(item => item.identifier),
		})),
	});

	return {
		CreateOrganizationForm: Form,
		checkCreateOrganizationForm: checkForm,
		resetCreateOrganizationForm: resetForm,
	};
}
