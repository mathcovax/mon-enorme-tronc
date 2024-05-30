import type { ZodType, infer as ZodInfer } from "zod";
import type { Ref } from "vue";

import type { TextInputDef } from "./_inputs/TextInput";
import type { NumberInputDef } from "./_inputs/NumberInput";
import type { ComboBoxInputDef, ItemComboBox } from "./_inputs/ComboBoxInput";
import type { CheckboxInputDef } from "./_inputs/CheckboxInput";
import type { SelectInputDef } from "./_inputs/SelectInput";
import type { TextareaInputDef } from "./_inputs/TextareaInput";
import type { DateInputDef } from "./_inputs/DateInput";
import type { RadioGroupDef } from "./_inputs/RadioGroupInput";
import type { CustomInputDef } from "./_inputs/CustomInput";

export interface BaseInputDef {
	type: string
	defaultValue?: unknown
	label?: string
	zodSchema?: ZodType
	cols?: number
	inputProps?: Record<string, unknown>
	disabled?: boolean
}

export interface InputProps<modelValueInput = unknown> {
	modelValue: modelValueInput
	label: string
	zodSchema?: ZodType
	name: string
	formId: string
	inputProps: Record<string, unknown>
}

export type FormInputDef =
	| TextInputDef
	| NumberInputDef
	| ComboBoxInputDef
	| CheckboxInputDef
	| SelectInputDef
	| TextareaInputDef
	| DateInputDef
	| RadioGroupDef
	| CustomInputDef

interface SlotProps<T = unknown> {
	modelValue: T,
	onUpdate: (value: T) => void
	formId: string
}

type GetValue<ref> = ref extends Ref<infer value> ? value : ref

type ExtractCustomDef<
	formInputs extends Record<string, FormInputDef | Ref<FormInputDef>>
> = Exclude<
	{
		[prop in keyof formInputs]: formInputs[prop] extends CustomInputDef
		? [prop, formInputs[prop]]
		: undefined
	}[keyof formInputs],
	undefined
>

type CustomDefToSlots<CustomDef extends [string, CustomInputDef]> =
	CustomDef extends [infer prop, infer def]
		? { [p in prop]?: (props: SlotProps<def["defaultValue"]>) => never }
		: never

type UnionToIntersection<U> =
	(U extends unknown ? (x: U) => void : never) extends ((x: infer I) => void) ? I : never

export type GetSlots<
	formInputs extends Record<string, FormInputDef | Ref<FormInputDef>>,
> = UnionToIntersection<CustomDefToSlots<ExtractCustomDef<formInputs>>>

export type SlotObject = Record<
	string,
	(
		props: SlotProps
	) => never
>

export type FormInputToRecordRef<
	formInputs extends Record<string, FormInputDef | Ref<FormInputDef>>
> = {
		[name in keyof formInputs as name]: Ref<
			(
				unknown extends GetValue<formInputs[name]>["defaultValue"]
					? (
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
						: GetValue<formInputs[name]>["type"] extends "date"
						? string
						: GetValue<formInputs[name]>["type"] extends "radio"
						? string
						: undefined
					) | undefined
					: GetValue<formInputs[name]>["defaultValue"]
			) | (
				GetValue<formInputs[name]>["disabled"] extends boolean
					? undefined 
					: never 
			)
		> 
	}

export type ResultCheckForm<
	formInputs extends Record<string, FormInputDef | Ref<FormInputDef>>
> = {
	[name in keyof formInputs as name]: (
		GetValue<formInputs[name]>["zodSchema"] extends ZodType
			? ZodInfer<GetValue<formInputs[name]>["zodSchema"]>
			: GetValue<formInputs[name]>["defaultValue"]
	) | (
		GetValue<formInputs[name]>["disabled"] extends boolean 
			? undefined 
			: never 
	)
}
