import { navigationItemType, type NavigationItemType } from "@/lib/utils";

export function useNavigationItemForm() {
	const { Form, formId, values } = useFormBuilder({
		type: {
			type: "select",
			items: navigationItemType.map(v => ({
				label: $t(`navigationItemType.${v}`), 
				value: v
			})),
			zodSchema: zod.object({ value: zod.enum(navigationItemType) }, { message: $t("form.rule.required") })
				.transform(({ value }) => value)
		},
		title: {
			type: "text",
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.min(3, { message: $t("form.rule.minLength", { value: 3 }) })
				.max(30, { message: $t("form.rule.maxLength", { value: 30 }) })
		},
		priority: {
			type: "number",
			zodSchema: zod.number({ message: $t("form.rule.required") })
		},
		parentCategory: computed(() => ({
			type: "combo",
			items: [],
			placeholder: "",
			emptyLabel: "",
			textButton: "",
			zodSchema: debugRefType.value === "PARENT_CATEGORY" 
				? zod.object({ indentifier: zod.string() }).transform(({ indentifier }) => indentifier) 
				: zod.undefined()
		}))
	});

	const debugRefType = values.type as Ref<NavigationItemType>;

	return {
		NavigationItemForm: Form,
		NavigationItemFormId: formId,
		NavigationItemFormValues: values,
	};
}
