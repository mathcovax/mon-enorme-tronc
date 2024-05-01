```ts

const test = ref("test");

const frameworks = computed(() => [
	{ identifier: "next.js", label: "Next.js" },
	{ identifier: "sveltekit", label: "SvelteKit" },
	{ identifier: "nuxt.js", label: "Nuxt.js" },
	{ identifier: "remix", label: "Remix" },
	{ identifier: "astro", label: "Astro" },
]);

const { values, Form: SignForm, checkForm } = useFormBuilder({
	test: computed(() => ({
		type: "string",
		zodSchema: zod.string().transform((v) => [v]),
		label: test.value,
	})),
	te: {
		type: "string",
		zodSchema: zod.string({ message: "n'est pas une string" }),
	},
	num: {
		type: "number",
		zodSchema: zod.number({ message: "n'est pas un nombre" }),
	},
	framework: computed(() => ({
		type: "combo",
		items: frameworks.value,
		placeholder: "tata",
		defaultLabel: "eeee",
		emptyLabel: "zizi",
		zodSchema: zod.string().array(),
		onUpdateSearchTerm: console.log,
	}))
});

setTimeout(async () => {
	const tt = await checkForm();
	if(tt){
		tt.test;
		tt.te;
		tt.num;
		tt.framework;
	}
	frameworks.value.pop();
}, 4000);

effect(() => {
	console.log(
		values.test.value, values.te.value, values.num.value, values.framework.value
	);
});
```