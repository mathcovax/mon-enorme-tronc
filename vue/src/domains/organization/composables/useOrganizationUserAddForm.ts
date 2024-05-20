import { organizationRoles, type OrganizationRole } from "@/lib/utils";

export type EditingOrganizationRole = Exclude<OrganizationRole, "OWNER">
export const editingOrganizationRoles = organizationRoles.filter(r => r !== "OWNER") as TuplifyUnion<EditingOrganizationRole>;

export function useOrganizationUserAddForm() {
	const { Form, checkForm, resetForm } = useFormBuilder({
		firstname: {
			type: "text",
			label: $t("page.organizationUser.form.firstname.label"),
			cols: 6,
			zodSchema: zod.string({ message: $t("page.organizationUser.form.required") })
		},
		lastname: {
			type: "text",
			label: $t("page.organizationUser.form.lastname.label"),
			cols: 6,
			zodSchema: zod.string({ message: $t("page.organizationUser.form.required") })
		},
		email: {
			type: "text",
			label: $t("page.organizationUser.form.email.label"),
			zodSchema: zod.string({ message: $t("page.organizationUser.form.required") })
				.email({ message: $t("page.organizationUser.form.email.wrong") })
		},
		organizationRole: {
			type: "select",
			label: $t("page.organizationUser.form.organizationRole.label"),
			defaultValue: undefined as EditingOrganizationRole | undefined, 
			items: editingOrganizationRoles.map(r => ({
				label: $t(`organizationRole.${r}`), 
				value: r
			})),
			zodSchema: zod.enum(editingOrganizationRoles, { message: $t("page.organizationUser.form.required") }),
		},
	});

	return {
		FormOrganizationUserAdd: Form,
		checkFormOrganizationUserAdd: checkForm,
		resetFormOrganizationUserAdd: resetForm
	};
}
