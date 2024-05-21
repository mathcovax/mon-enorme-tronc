import { primordialRoles, type PrimordialRole, type User } from "@/lib/utils";

type EditingPrimordialRole = Exclude<PrimordialRole, "ADMIN">
const editingPrimordialRole = primordialRoles.filter(r => r !== "ADMIN") as TuplifyUnion<EditingPrimordialRole>;

export function useUserForm() {
	const $pt = usePageTranslate();
	const { Form, checkForm, resetForm, values } = useFormBuilder({
		user: {
			type: "custom",
			defaultValue: undefined as undefined | User,
			zodSchema: zod.object({ id: zod.string() })
		},
		primordialRole: {
			type: "select",
			label: $pt("form.primordialRole.label"),
			defaultValue: undefined as EditingPrimordialRole | undefined, 
			items: editingPrimordialRole.map(r => ({
				label: $t(`role.${r}`), 
				value: r
			})),
			zodSchema: zod.enum(editingPrimordialRole),
			cols: 8,
		},
		muted: {
			type: "checkbox",
			defaultValue: false as boolean,
			desc: $pt("form.muted.label"),
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
