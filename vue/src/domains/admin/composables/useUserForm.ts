import { primordialRoles, type PrimordialRole, type User } from "@/lib/utils";

type EditingPrimordialRole = Exclude<PrimordialRole, "ADMIN">
const editingPrimordialRole = primordialRoles.filter(r => r !== "ADMIN") as TuplifyUnion<EditingPrimordialRole>;

export function useUserForm(){
	const { Form, checkForm, resetForm, values } = useFormBuilder({
		user: {
			type: "custom",
			defaultValue: undefined as undefined | User,
			zodSchema: zod.object({ id: zod.string() })
		},
		primordialRole: {
			type: "select",
			label: $t("page.manageUser.form.primordialRole.label"),
			defaultValue: undefined as EditingPrimordialRole | undefined, 
			items: editingPrimordialRole.map(r => ({
				label: $t(`roles.${r}`), 
				value: r
			})),
			zodSchema: zod.enum(editingPrimordialRole),
			cols: 8,
		},
		muted: {
			type: "checkbox",
			defaultValue: false as boolean,
			desc: $t("page.manageUser.form.muted.label"),
			cols: 4,
		}
	});

	return {
		UserForm: Form,
		checkUserForm: checkForm,
		resetUserForm: resetForm,
		valuesUserForm: values,
	};
}
