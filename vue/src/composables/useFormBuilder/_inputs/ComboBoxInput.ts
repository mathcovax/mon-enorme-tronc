import { effect } from "vue";
import type { BaseInput, InputProps } from "../types";
import ComboBox from "@/components/ui/combo-box/ComboBox.vue";

interface ItemsComboBox {
	label: string
	identifier: number | string
}

export interface ComboBoxInputProps extends InputProps<ItemsComboBox> {
	items: ItemsComboBox[]
	defaultLabel: string
	placeholder: string
	emptyLabel: string
}

export interface ComboBoxInputDef<inputName extends string> extends BaseInput<inputName, "combo", ItemsComboBox | undefined> {
	items: ItemsComboBox[]
	defaultLabel: string
	placeholder: string
	emptyLabel: string
}

export const ComboBoxInput = defineComponent({
	props: [
		"label", "modelValue", "zodSchema", "name", "defaultLabel", "placeholder", "emptyLabel", "items"
	],
	setup(props: ComboBoxInputProps, { expose, emit }){
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
			if(toValidated && props.zodSchema){
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
					ComboBox, 
					{
						id: props.name,
						items: props.items as {[P in keyof ItemsComboBox]: ItemsComboBox[P]}[],
						getLabel: (i: unknown) => (i as ItemsComboBox).label,
						getIdentifier: (i: unknown) => (i as ItemsComboBox).identifier,
						defaultLabel: props.defaultLabel,
						placeholder: props.placeholder,
						emptyLabel: props.emptyLabel,
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

