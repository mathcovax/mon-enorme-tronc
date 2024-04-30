import type { ZodType, infer as ZodInfer } from "zod";
import type { Ref } from "vue";

import type { TextInputDef } from "./_inputs/TextInput";
import type { NumberInputDef } from "./_inputs/NumberInput";
import type { ComboBoxInputDef } from "./_inputs/ComboBoxInput";

export interface BaseInput<
	inputName extends string,
	inputType extends string,
	valueType,
> {
	name: inputName
	type: inputType
	defaultValue: 
		valueType extends string | number | undefined | null
			? valueType
			: (() => valueType)
	label?: string | Ref<string>
	zodSchema?: ZodType
	clos?: number
}

export interface InputProps<modelValueInput = unknown> {
	modelValue: modelValueInput
	label: string
	zodSchema?: ZodType
	name: string
}

export type FormInput<
	inputName extends string = string,
> = 
	| TextInputDef<inputName>
	| NumberInputDef<inputName>
	| ComboBoxInputDef<inputName>


export type FormInputToRecordRef<
	baseInput extends BaseInput<string, string>
> = {
	[input in baseInput as input["name"]]: Ref<
		input extends BaseInput<unknown, unknown, infer valueType> 
			? valueType | undefined
			: undefined
	>
}

export type ResultCheckForm<
	baseInput extends BaseInput<string, string>
> = {
	[input in baseInput as input["name"]]: 
		input["zodSchema"] extends ZodType
			? ZodInfer<input["zodSchema"]>
			: undefined
}
