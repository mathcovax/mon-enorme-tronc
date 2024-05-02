import { effect } from "vue";
import type { BaseInputDef, InputProps } from "../types";
import PrimaryComboBox from "@/components/PrimaryComboBox.vue";

export interface ItemComboBox {
	label: string
	identifier: number | string
}

export interface ComboBoxInputProps extends InputProps<ItemComboBox> {
	items: ItemComboBox[]
	onUpdateSearchTerm?: (value: string) => void
	textButton: string
	placeholder: string
	emptyLabel: string
}

export interface ComboBoxInputDef extends BaseInputDef {
	type: "combo"
	defaultValue?: () => ItemComboBox
	onUpdateSearchTerm?: (value: string) => void
	items: ItemComboBox[]
	textButton: string
	placeholder: string
	emptyLabel: string
}

export const ComboBoxInput = defineComponent({
	props: [
		"label", "modelValue", "zodSchema", "name", "textButton", "placeholder", "emptyLabel", "items", "onUpdateSearchTerm"
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
				class: "flex flex-col gap-2"
			},
			[
				props.label
					? h(
						"label", 
						{
							class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
							for: props.name,
						},
						props.label
					)
					: null,
				h(
					PrimaryComboBox, 
					{
						items: props.items as {[P in keyof ItemComboBox]: ItemComboBox[P]}[],
						getLabel: (i: unknown) => (i as ItemComboBox).label,
						getIdentifier: (i: unknown) => (i as ItemComboBox).identifier,
						textButton: props.textButton,
						placeholder: props.placeholder,
						emptyLabel: props.emptyLabel,
						modelValue: props.modelValue,
						"onUpdate:modelValue": (value: unknown) => {
							emit("update:modelValue", value);
						},
						"onUpdate:searchTerm": props.onUpdateSearchTerm,
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

