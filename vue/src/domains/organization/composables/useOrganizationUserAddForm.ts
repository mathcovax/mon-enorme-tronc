import { organizationRoles, type OrganizationRole } from "@/lib/utils";

export type EditingOrganizationRole = Exclude<OrganizationRole, "OWNER">
export const editingOrganizationRoles = organizationRoles.filter(r => r !== "OWNER") as TuplifyUnion<EditingOrganizationRole>;

export function useOrganizationUserAddForm() {
	const { Form, checkForm, resetForm } = useFormBuilder({
		firstname: {
			type: "text",
			label: $t("label.firstname"),
			cols: 6,
			zodSchema: zod.string({ message: $t("form.rule.required") })
		},
		lastname: {
			type: "text",
			label: $t("label.lastname"),
			cols: 6,
			zodSchema: zod.string({ message: $t("form.rule.required") })
		},
		email: {
			type: "text",
			label: $t("label.email"),
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.email({ message: $t("label.email.wrong") })
		},
		organizationRole: {
			type: "select",
			label: $t("label.role"),
			defaultValue: undefined as EditingOrganizationRole | undefined, 
			items: editingOrganizationRoles.map(r => ({
				label: $t(`organizationRole.${r}`), 
				value: r
			})),
			zodSchema: zod.enum(editingOrganizationRoles, { message: $t("form.rule.required") }),
		},
	});

	return {
		FormOrganizationUserAdd: Form,
		checkFormOrganizationUserAdd: checkForm,
		resetFormOrganizationUserAdd: resetForm
	};
}
