/* eslint-disable vue/require-prop-types */
import { effect } from "vue";
import type { BaseInputDef, InputProps } from "../types";
import PrimaryInput from "@/components/PrimaryInput.vue";

export type NumberInputProps = InputProps<number>;

export interface NumberInputDef extends BaseInputDef {
	type: "number"
	defaultValue?: number
}

export const NumberInput = defineComponent({
	props: [
		"label", "modelValue", "zodSchema", "name", "formId", "inputProps"
	],
	setup(props: NumberInputProps, { expose, emit }) {
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
					PrimaryInput, 
					{
						...props.inputProps,
						type: "number",
						name: `${props.name}-${props.formId}`,
						id: `${props.name}-${props.formId}`,
						modelValue: props.modelValue,
						"onUpdate:modelValue": (value: unknown) => {
							emit("update:modelValue", Number(value));
						},
					}
				),
				props.zodSchema
					? h(
						"div", 
						{
							class: "min-h-6"
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

