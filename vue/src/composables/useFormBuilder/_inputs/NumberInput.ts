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
		"label", "modelValue", "zodSchema", "name"
	],
	setup(props: NumberInputProps, { expose, emit }){
		const toValidated = ref(false);
		const errorMessage = ref("");

		async function submit(){
			if(props.zodSchema){
				const result = await props.zodSchema.safeParseAsync(props.modelValue);
				if(!result.success){
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
			if(toValidated.value && props.zodSchema){
				const result = await props.zodSchema.safeParseAsync(props.modelValue);
				if(!result.success){
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
							for: props.name,
						},
						props.label
					)
					: null,
				h(
					PrimaryInput, 
					{
						type: "number",
						name: props.name,
						id: props.name,
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
