import type { FunctionalComponent, VNode, Ref } from "vue";
import { TextInput } from "./_inputs/TextInput";
import type { FormInputDef, FormInputToRecordRef, ResultCheckForm } from "./types";

const inputMapper = {
	text: TextInput,
	number: NumberInput,
	combo: ComboBoxInput,
	checkbox: CheckboxInput,
	select: SelectInput,
	textarea: TextareaInput,
	"date-picker": DatePickerInput,
	radio: RadioGroupInput,
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

	const childInput = () => {
		inputRefs = [];
		return Object.entries(formInputs).map(
			([name, input]) => {
				input = isRef(input) ? input.value : input;
				const { type, label, zodSchema, clo, ...reste } = input;

				const component = h(
					inputMapper[type],
					{
						style: {
							"grid-column": clo 
								? `span ${clo} / span ${clo}` 
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
					}
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

	const Form: FunctionalComponent<unknown, {"submit": [event: Event]}> = (props, { slots }) => 
		h(
			"form",
			{
				class: "grid grid-cols-12 gap-3",
				onSubmit: (event) => {
					event.preventDefault();
				}
			},
			[childInput(), slots.default?.(),]
		);

	return {
		Form,
		values: values as FormInputToRecordRef<inputDef>,
		inputRefs,
		checkForm,
	};
}
