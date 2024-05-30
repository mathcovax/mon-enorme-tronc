import { navigationItemType, type NavigationItem, type NavigationItemType } from "@/lib/utils";
import { useGetParentCategories } from "./useGetParentCategories";
import { useGetCategories } from "./useGetCategories";

export function useNavigationItemForm() {
	const $pt = usePageTranslate();
	const { getParentCategories, parentCategories } = useGetParentCategories();
	const { getCategories, categories } = useGetCategories();

	const debugRefType = ref<undefined | NavigationItemType>();

	const { Form, values, resetForm, checkForm } = useFormBuilder({
		oldNavigationItem: {
			type: "custom",
			defaultValue: undefined as undefined | NavigationItem
		},
		type: {
			type: "select",
			items: navigationItemType.map(v => ({
				label: $t(`navigationItemType.${v}`), 
				value: v
			})),
			label: $t("label.type"),
			defaultValue: "LINK" as  NavigationItemType,
			zodSchema: zod.enum(navigationItemType, { message: $t("form.rule.required") })
		},
		priority: {
			type: "number",
			label: $pt("label.priority"),
			zodSchema: zod.number({ message: $t("form.rule.required") })
		},
		parentCategory: computed(() => ({
			type: "combo",
			items: parentCategories.value.map(({ name }) => ({ label: name, identifier: name })),
			placeholder: "",
			emptyLabel: $t("label.empty"),
			textButton: $pt("label.select"),
			label: $t("navigationItemType.PARENT_CATEGORY"),
			onUpdateSearchTerm: (name) => getParentCategories(undefined, name),
			zodSchema: zod.object(
				{ identifier: zod.string() }, 
				{ message: $t("form.rule.required") }
			).transform(({ identifier }) => identifier),
			disabled: debugRefType.value !== "PARENT_CATEGORY"
		})),
		category: computed(() => ({
			type: "combo",
			items: categories.value.map(({ name }) => ({ label: name, identifier: name })),
			placeholder: "",
			emptyLabel: $t("label.empty"),
			textButton: $pt("label.select"),
			label: $t("navigationItemType.CATEGORY"),
			onUpdateSearchTerm: (name) => getCategories(undefined, name),
			zodSchema: zod.object(
				{ identifier: zod.string() }, 
				{ message: $t("form.rule.required") }
			).transform(({ identifier }) => identifier),
			disabled: debugRefType.value !== "CATEGORY"
		})),
		title: computed(() => ({
			type: "text",
			label: $t("label.title"),
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.min(3, { message: $t("form.rule.minLength", { value: 3 }) })
				.max(30, { message: $t("form.rule.maxLength", { value: 30 }) }),
			disabled: debugRefType.value !== "LINK"
		})),
		url: computed(() => ({
			type: "text",
			label: $t("navigationItemType.LINK"),
			zodSchema: zod.string({ message: $t("form.rule.required") })
				.url()
				.max(400),
			disabled: debugRefType.value !== "LINK"
		})),
	});

	watchEffect(
		() => {
			debugRefType.value = values.type.value;
		}
	);

	return {
		NavigationItemForm: Form,
		navigationItemFormValues: values,
		resetNavigationItemForm: resetForm,
		checkNavigationItemForm: async () => {
			const formField = await checkForm();

			if (!formField) {
				return null;
			}
		
			const baseNavigationItem: Pick<NavigationItem, "priority" | "type" | "id"> = {
				id: formField.oldNavigationItem?.id ?? "",
				type: formField.type,
				priority: formField.priority,
			};
			let navigationItem: NavigationItem | undefined;
		
			if (baseNavigationItem.type === "PARENT_CATEGORY" && formField.parentCategory) {
				navigationItem = {
					...baseNavigationItem,
					type: "PARENT_CATEGORY",
					parentCategoryName: formField.parentCategory
				};
			}
			else if (baseNavigationItem.type === "CATEGORY"  && formField.category) {
				navigationItem = {
					...baseNavigationItem,
					type: baseNavigationItem.type,
					categoryName: formField.category
				};
			}
			else if (baseNavigationItem.type === "LINK"  && formField.url && formField.title) {
				navigationItem = {
					...baseNavigationItem,
					type: baseNavigationItem.type,
					url: formField.url,
					title: formField.title,
				};
			} 
			
			if (!navigationItem) {
				return null;
			}
			
			return navigationItem;
		},
	};
}
