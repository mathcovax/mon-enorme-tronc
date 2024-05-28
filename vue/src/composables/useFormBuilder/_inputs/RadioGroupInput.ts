/* eslint-disable vue/require-prop-types */
import { effect } from "vue";
import type { BaseInputDef, InputProps } from "../types";
import PrimaryRadioGroup from "@/components/PrimaryRadioGroup.vue";

export interface ItemRadioGroup {
	label: string
	value: string
}

export interface RadioGroupProps extends InputProps<string> {
	items: ItemRadioGroup[]
}

export interface RadioGroupDef extends BaseInputDef {
	type: "radio"
	defaultValue?: string
	items: ItemRadioGroup[]
}

export const RadioGroupInput = defineComponent({
	props: [
		"label", "modelValue", "zodSchema", "name", "items", "formId", "inputProps"
	],
	setup(props: RadioGroupProps, { expose, emit }) {
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
				class: "flex flex-col"
			},
			[
				props.label
					? h(
						"label", 
						{
							class: "",
							for: `${props.name}-${props.formId}`
						},
						props.label
					)
					: null,
				h(
					PrimaryRadioGroup, 
					{
						...props.inputProps,
						id: `${props.name}-${props.formId}`,
						items: props.items,
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

