import { effect } from "vue";
import type { BaseInputDef, InputProps } from "../types";
import TheCheckbox from "@/components/ui/checkbox/TheCheckbox.vue";

export interface CheckboxInputProps extends InputProps<boolean>{
	desc?: string
	reverse?: boolean
}

export interface CheckboxInputDef extends BaseInputDef {
	type: "checkbox"
	defaultValue?: boolean
	desc?: string
	reverse?: boolean
}

export const CheckboxInput = defineComponent({
	props: [
		"label", "modelValue", "zodSchema", "name", "desc", "reverse"
	],
	setup(props: CheckboxInputProps, { expose, emit }){
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
					"div", 
					{
						class: `flex gap-4 items-center ${props.reverse ? "flex-row-reverse" : ""}`
					},
					[
						h(
							TheCheckbox, 
							{
								name: props.name,
								id: props.name,
								checked: props.modelValue,
								"onUpdate:checked": (value: unknown) => {
									emit("update:modelValue", value);
								},
							}
						),
						props.desc
							? h(
								"label", 
								{
									class: "",
									for: props.desc,
								},
								props.desc
							)
							: null,
					]
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

