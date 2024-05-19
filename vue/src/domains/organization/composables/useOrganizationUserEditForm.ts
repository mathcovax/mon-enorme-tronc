import type { OrganizationUser } from "@/lib/utils";
import { editingOrganizationRoles, type EditingOrganizationRole } from "./useOrganizationUserAddForm";

export function useOrganizationUserEditForm() {
	const { Form, checkForm, resetForm, values } = useFormBuilder({
		user: {
			type: "custom",
			defaultValue: undefined as undefined | OrganizationUser,
			zodSchema: zod.object({ id: zod.string() })
		},
		organizationRole: {
			type: "select",
			label: $t("page.organizationUser.form.organizationRole.label"),
			defaultValue: undefined as EditingOrganizationRole | undefined, 
			items: editingOrganizationRoles.map(r => ({
				label: $t(`organizationRole.${r}`), 
				value: r
			})),
			zodSchema: zod.enum(editingOrganizationRoles).optional(),
		},
	});

	return {
		FormOrganizationUserEdit: Form,
		checkFormOrganizationUserEdit: checkForm,
		resetFormOrganizationUserEdit: resetForm,
		valuesFormOrganizationUserEdit: values,
	};
}
