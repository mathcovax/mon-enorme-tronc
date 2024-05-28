/* eslint-disable vue/require-prop-types */
import { effect } from "vue";
import type { BaseInputDef, InputProps } from "../types";
import PrimaryTextarea from "@/components/PrimaryTextarea.vue";

export type TextareaInputProps = InputProps<string>;

export interface TextareaInputDef extends BaseInputDef {
	type: "textarea"
	defaultValue?: string
}

export const TextareaInput = defineComponent({
	props: [
		"label", "modelValue", "zodSchema", "name", "formId", "inputProps"
	],
	setup(props: TextareaInputProps, { expose, emit }) {
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
							for: `${props.name}-${props.formId}`,
						},
						props.label
					)
					: null,
				h(
					PrimaryTextarea, 
					{
						...props.inputProps,
						type: "number",
						name: `${props.name}-${props.formId}`,
						id: `${props.name}-${props.formId}`,
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

