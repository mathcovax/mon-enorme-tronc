import type { FunctionalComponent, VNode } from "vue";
import { TextInput } from "./_inputs/TextInput";
import type { FormInput, FormInputToRecordRef, ResultCheckForm } from "./types";

const inputMapper = {
	string: TextInput,
	number: NumberInput,
};

export function useFormBuilder<
	inputName extends string,
	input extends FormInput<inputName>
>(
	formInputs: input[]
)
{
	const values = Object.fromEntries(
		formInputs.map(input => [input.name, ref<unknown>(input.defaultValue)])
	);
	
	let inputRefs: VNode[] = [];

	const childInput = () => {
		inputRefs = [];
		return formInputs.map(
			({ type, name, label, zodSchema, clos, ...reste }) => {
				const component = h(
					inputMapper[type],
					{
						style: {
							"grid-column": clos 
								? `span ${clos} / span ${clos}` 
								: "span 12 / span 12"
						},
						modelValue: values[name].value,
						"onUpdate:modelValue": (value: unknown) => {
							values[name].value = value;
						},
						label: !label || typeof label === "string"
							? label
							: label.value,
						zodSchema: zodSchema,
						name: name,
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
			? resultValue as ResultCheckForm<input>
			: null;
	}

	const Form: FunctionalComponent = (props, { slots }) => 
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
		values: values as FormInputToRecordRef<input>,
		inputRefs,
		checkForm,
	};
}
