import type { ZodType, infer as ZodInfer } from "zod";
import type { Ref } from "vue";

import type { TextInputDef } from "./_inputs/TextInput";
import type { NumberInputDef } from "./_inputs/NumberInput";
import type { ComboBoxInputDef, ItemsComboBox } from "./_inputs/ComboBoxInput";

export interface BaseInputDef {
	type: string
	defaultValue?: unknown
	label?: string
	zodSchema?: ZodType
	clos?: number
}

export interface InputProps<modelValueInput = unknown> {
	modelValue: modelValueInput
	label: string
	zodSchema?: ZodType
	name: string
}

export type FormInputDef = 
	| TextInputDef
	| NumberInputDef
	| ComboBoxInputDef


type GetValue<ref> = ref extends Ref<infer value> ? value : ref

export type FormInputToRecordRef<
	formInputs extends Record<string, FormInputDef | Ref<FormInputDef>>
> = {
	[name in keyof formInputs as name]: Ref<
		(
			GetValue<formInputs[name]>["type"] extends "string"
				? string 
			: GetValue<formInputs[name]>["type"] extends "number" 
				? number
			: GetValue<formInputs[name]>["type"] extends "combo"
				? ItemsComboBox
			: never
		) | undefined
	>
}

export type ResultCheckForm<
	formInputs extends Record<string, FormInputDef | Ref<FormInputDef>>
> = {
	[name in keyof formInputs as name]: 
		GetValue<formInputs[name]>["zodSchema"] extends ZodType
			? ZodInfer<GetValue<formInputs[name]>["zodSchema"]>
			: unknown
}
