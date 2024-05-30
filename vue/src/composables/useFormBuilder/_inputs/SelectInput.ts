/* eslint-disable vue/require-prop-types */
import { effect } from "vue";
import type { BaseInputDef, InputProps } from "../types";
import PrimarySelect from "@/components/PrimarySelect.vue";

export interface ItemSelect {
	label: string
	value: string | number
}

export interface SelectInputProps extends InputProps<string> {
	items: ItemSelect[]
	placeholder?: string
}

export interface SelectInputDef extends BaseInputDef {
	type: "select"
	defaultValue?: string
	items: ItemSelect[]
	placeholder?: string
}

export const SelectInput = defineComponent({
	props: [
		"label", "modelValue", "zodSchema", "name", "items", "placeholder", "formId", "inputProps"
	],
	setup(props: SelectInputProps, { expose, emit }) {
		const toValidated = ref(false);
		const errorMessage = ref("");

		async function submit() {
			if (props.zodSchema) {
				const result = await props.zodSchema.safeParseAsync(props.modelValue);
				if (!result.success) {
					toValidated.value = true;
					throw new Error(result.error.issues[0].message);
				}
				else {
					return result.data;
				}
			}
			return props.modelValue;
		}

		expose({ submit });

		effect(async () => {
			if (toValidated.value && props.zodSchema) {
				const result = await props.zodSchema.safeParseAsync(props.modelValue);
				if (!result.success) {
					errorMessage.value = result.error.issues[0].message;
					return;
				}
			}
			toValidated.value = false;
			errorMessage.value = "";
		});
	
		return () => h(
			"div",
			{
				class: "flex flex-col gap-2"
			},
			[
				props.label
					? h(
						"label", 
						{
							class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
							for: `${props.name}-${props.formId}`,
						},
						props.label
					)
					: null,
				h(
					PrimarySelect, 
					{
						...props.inputProps,
						name: `${props.name}-${props.formId}`,
						id: `${props.name}-${props.formId}`,
						items: props.items,
						placeholder: props.placeholder,
						modelValue: props.modelValue,
						"onUpdate:modelValue": (value: unknown) => {
							emit("update:modelValue", value);
						},
					}
				),
				props.zodSchema
					? h(
						"div", 
						{
							class: "h-6"
						},
						[
							h(
								"small", 
								{
									class: "text-invalide"
								},
								errorMessage.value
							)
						]
					)
					: null,
			]
		);
	}
});

