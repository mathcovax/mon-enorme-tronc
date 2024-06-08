declare global {
	const filterDefs: (typeof import("./filters"))["filterDefs"];

	interface FilterDefBase<T extends string> {
		type: T
		name: string
		path: string
	}
	interface FilterDefCheckbox extends FilterDefBase<"checkbox"> {
		values: string[]
	}
	
	interface FilterDefRadio extends FilterDefBase<"radio"> {
		values: string[]
	}
	
	type FilterDefToggle = FilterDefBase<"toggle">

	type FilterDefRange = FilterDefBase<"range">

	type FilterDefSearch = Omit<FilterDefBase<"full-text">, "path">

	type FilterDef = 
		| FilterDefCheckbox 
		| FilterDefRadio 
		| FilterDefToggle 
		| FilterDefRange
		| FilterDefSearch
}

export const filterDefs: FilterDef[] = [
	{
		type: "checkbox",
		name: "color",
		path: "facets.COLOR",
		values: [
			"red", "blue", "green", "yellow", "black", "white"
		]
	},
	{
		type: "checkbox",
		name: "size",
		path: "facets.SIZE",
		values: ["small", "medium", "large"]
	},
	{
		type: "checkbox",
		name: "diameter",
		path: "facets.DIAMETER",
		values: [
			"20mm", "30mm", "40mm", "50mm", "60mm"
		]
	},
	{
		type: "radio",
		name: "target",
		path: "facets.TARGET",
		values: ["man", "woman", "man/woman"]
	},
	{
		type: "toggle",
		name: "accessory",
		path: "facets.ACCESSORY",
	},
	{
		type: "checkbox",
		name: "material",
		path: "facets.MATERIAL",
		values: ["wood", "plastic"]
	},
	{
		type: "checkbox",
		name: "stimulation",
		path: "facets.STIMULATION",
		values: [
			"anal", "vaginal", "clitoral", "prostate"
		]
	},
	{
		type: "range",
		name: "price",
		path: "price"
	},
	{
		type: "full-text",
		name: "search",
	},
];

//@ts-expect-error var 'global' cause type error.
global.filterDefs = filterDefs;
