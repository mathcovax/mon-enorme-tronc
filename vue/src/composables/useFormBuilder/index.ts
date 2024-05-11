import type { FunctionalComponent, VNode, Ref } from "vue";
import type { FormInputDef, FormInputToRecordRef, GetSlots, ResultCheckForm, SlotObject } from "./types";

const inputMapper = {
	text: TextInput,
	number: NumberInput,
	combo: ComboBoxInput,
	checkbox: CheckboxInput,
	select: SelectInput,
	textarea: TextareaInput,
	date: DateInput,
	radio: RadioGroupInput,
	custom: CustomInput,
};

export function useFormBuilder<
	inputDef extends Record<string, FormInputDef | Ref<FormInputDef>>,
>(
	formInputs: inputDef
)
{
	const values = Object.fromEntries(
		Object.entries(formInputs).map(([name, input]) => {
			input = isRef(input) ? input.value : input;
			
			return [
				name, 
				ref<unknown>(
					typeof input.defaultValue === "function" 
						? input.defaultValue() 
						: input.defaultValue
				)
			];
		})
	);
	
	let inputRefs: VNode[] = [];

	const childInput = (slots: SlotObject) => {
		inputRefs = [];
		return Object.entries(formInputs).map(
			([name, input]) => {
				input = isRef(input) ? input.value : input;
				const { type, label, zodSchema, cols, ...reste } = input;
				
				const component = h(
					inputMapper[type],
					{
						style: {
							"grid-column": cols 
								? `span ${cols} / span ${cols}` 
								: "span 12 / span 12"
						},
						modelValue: values[name].value,
						"onUpdate:modelValue": (value: unknown) => {
							values[name].value = value;
						},
						label,
						zodSchema,
						name,
						key: name,
						...reste
					},
					type === "custom"
						? () => slots[name]?.({
							modelValue: values[name].value,
							onUpdate: (value) => {
								values[name].value = value;
							}
						}) 
						: undefined
				);
				inputRefs.push(component);
				return component;
			}
		);
	};

	async function checkForm(){
		let valid = true;

		const resultValue: Record<string, unknown> = {};
		
		for(const ref of inputRefs) {
			const key = ref.component?.props.name;
			const submit = ref.component?.exposed?.submit;
			if(
				typeof key !== "string" || 
				typeof submit !== "function"
			) {
				throw new Error("Input missign key or submit function");
			}
			try {
				resultValue[key] = await submit();
			} catch {
				valid = false;
			}
		}

		return valid 
			? resultValue as ResultCheckForm<inputDef>
			: null;
	}

	const Form: FunctionalComponent<
		unknown, 
		{"submit": [event: Event]},
		{default?: () => never} & GetSlots<inputDef>
	> = (props, { slots: wrongTypedSlots }) => {
		const slots = wrongTypedSlots as {default?: () => never};

		return h(
			"form",
			{
				class: "grid grid-cols-12 gap-3",
				onSubmit: (event) => {
					event.preventDefault();
				}
			},
			[childInput(slots), slots.default?.()]
		);
	}; 
	return {
		Form,
		values: values as FormInputToRecordRef<inputDef>,
		inputRefs,
		checkForm,
	};
}
