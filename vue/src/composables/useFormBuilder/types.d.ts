import type { ZodType, infer as ZodInfer } from "zod";
import type { Ref } from "vue";

import type { TextInputDef } from "./_inputs/TextInput";
import type { NumberInputDef } from "./_inputs/NumberInput";
import type { ComboBoxInputDef, ItemComboBox } from "./_inputs/ComboBoxInput";
import type { CheckboxInputDef } from "./_inputs/CheckboxInput";
import type { SelectInputDef } from "./_inputs/SelectInput";
import type { TextareaInputDef } from "./_inputs/TextareaInput";
import type { DatePickerInputDef } from "./_inputs/DatePickerInput";
import type { RadioGroupDef } from "./_inputs/RadioGroupInput";

export interface BaseInputDef {
	type: string
	defaultValue?: unknown
	label?: string
	zodSchema?: ZodType
	clo?: number
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
	| CheckboxInputDef
	| SelectInputDef
	| TextareaInputDef
	| DatePickerInputDef
	| RadioGroupDef


type GetValue<ref> = ref extends Ref<infer value> ? value : ref

export type FormInputToRecordRef<
	formInputs extends Record<string, FormInputDef | Ref<FormInputDef>>
> = {
	[name in keyof formInputs as name]: Ref<
		(
			GetValue<formInputs[name]>["type"] extends "text"
				? string 
			: GetValue<formInputs[name]>["type"] extends "number" 
				? number
			: GetValue<formInputs[name]>["type"] extends "combo"
				? ItemComboBox
			: GetValue<formInputs[name]>["type"] extends "checkbox"
				? boolean
			: GetValue<formInputs[name]>["type"] extends "select"
				? string
			: GetValue<formInputs[name]>["type"] extends "textarea"
				? string
			: GetValue<formInputs[name]>["type"] extends "date-picker"
				? string
			: GetValue<formInputs[name]>["type"] extends "radio"
				? string
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
