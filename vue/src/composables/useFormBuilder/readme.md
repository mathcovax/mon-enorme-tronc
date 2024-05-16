```vue
<script setup lang="ts">
const { Form, values, checkForm } = useFormBuilder({
	field1: {
		type: "text",
		defaultValue: "test",
	},
	field2: {
		type: "checkbox",
		defaultValue: true,
		label: "test",
		desc: "testete feedecefef efefe ec ez fezsf z fefes fgfez gzzegsgsr ggs ",
	},
	field3: {
		type: "combo",
		label: "test",
		items: [{ label: "test", identifier: "aaa" }],
		placeholder: "",
		emptyLabel: "",
		textButton: "test",
	},
	field4: {
		type: "select",
		label: "ok",
		items: [{ label: "te", value: "eeee" }],
	},
	field5: {
		type: "textarea",
		defaultValue: "test",
	},
	field6: {
		type: "date-picker",
		defaultValue: new Date().toISOString().split("T")[0],
	},
	field7: {
		type: "radio",
		items: [{ label: "testd zdzd zd zd zdz dz dzdzdz", value: "oooo" }, { label: "eee", value: "yaaaa" }] 
	},
	field8: {
		type: "custom",
		defaultValue: "" as string | undefined,
		zodSchema: zod.number()
	}
});

effect(() => {
	console.log(
		values.field1.value, 
		values.field2.value, 
		values.field3.value, 
		values.field4.value, 
		values.field5.value, 
		values.field6.value,
		values.field7.value,
		values.field8.value,
	);
});

async function test(){
	const result = await checkForm();

	console.log(result);
	result?.field1;
}

</script>

<template>
	<Form @submit="test">
		<template #field8="{modelValue, onUpdate}">
			<PrimaryInput
				:model-value="modelValue"
				@update:model-value="onUpdate"
			/>
		</template>

		<PrimaryButton type="submit">
			test
		</PrimaryButton>
	</Form>
</template>

```