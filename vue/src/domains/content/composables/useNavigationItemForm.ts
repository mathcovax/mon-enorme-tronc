import { navigationItemType, type NavigationItemType } from "@/lib/utils";
import { useGetParentCategories } from "./useGetParentCategories";
import { useGetCategories } from "./useGetCategories";

export function useNavigationItemForm() {
	const { getParentCategories, parentCategories } = useGetParentCategories();
	const { getCategories, categories } = useGetCategories();

	const debugRefType = ref<undefined | NavigationItemType>();

	const { Form, formId, values, resetForm } = useFormBuilder({
		type: {
			type: "select",
			items: navigationItemType.map(v => ({
				label: $t(`navigationItemType.${v}`), 
				value: v
			})),
			label: $t("label.type"),
			defaultValue: "LINK" as  NavigationItemType,
			zodSchema: zod.object({ value: zod.enum(navigationItemType) }, { message: $t("form.rule.required") })
				.transform(({ value }) => value)
		},
		title: {
			type: "text",
			label: $t("label.title"),
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
			items: parentCategories.value.map(({ name }) => ({ label: name, identifier: name })),
			placeholder: "",
			emptyLabel: "",
			textButton: "",
			onUpdateSearchTerm: (name) => getParentCategories(undefined, name),
			zodSchema: zod.object(
				{ indentifier: zod.string() }, 
				{ message: $t("form.rule.required") }
			).transform(({ indentifier }) => indentifier),
			disabled: debugRefType.value !== "PARENT_CATEGORY"
		})),
		category: computed(() => ({
			type: "combo",
			items: categories.value.map(({ name }) => ({ label: name, identifier: name })),
			placeholder: "",
			emptyLabel: "",
			textButton: "",
			onUpdateSearchTerm: (name) => getCategories(undefined, name),
			zodSchema: zod.object(
				{ indentifier: zod.string() }, 
				{ message: $t("form.rule.required") }
			).transform(({ indentifier }) => indentifier),
			disabled: debugRefType.value !== "CATEGORY"
		})),
		link: computed(() => ({
			type: "text",
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.url()
				.max(400),
			disabled: debugRefType.value !== "LINK"
		})),
	});

	watchEffect(() => {
		debugRefType.value = values.type.value;
	});

	return {
		NavigationItemForm: Form,
		NavigationItemFormId: formId,
		NavigationItemFormValues: values,
		resetNavigationItemForm: resetForm,
	};
}
