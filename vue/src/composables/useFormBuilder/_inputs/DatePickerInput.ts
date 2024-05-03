import { effect } from "vue";
import type { BaseInputDef, InputProps } from "../types";
import PrimaryDatePicker from "@/components/PrimaryDatePicker.vue";

export interface DatePickerInputProps extends InputProps<string> {
	placeholder?: string
}

export interface DatePickerInputDef extends BaseInputDef {
	type: "date-picker"
	defaultValue?: string
	placeholder?: string
}

export const DatePickerInput = defineComponent({
	props: [
		"label", "modelValue", "zodSchema", "name", "placeholder"
	],
	setup(props: DatePickerInputProps, { expose, emit }){
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
							for: props.name
						},
						props.label
					)
					: null,
				h(
					PrimaryDatePicker, 
					{
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

