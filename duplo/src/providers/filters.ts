declare global {
	const filterDefs: (typeof import("./filters"))["filterDefs"];

	interface FilterDefBase<
		T extends string, 
		N extends string = string
	> {
		type: T
		name: N
		path: string
	}
	interface FilterDefCheckbox<N extends string = string> extends FilterDefBase<"checkbox", N> {
		values: string[]
	}
	
	interface FilterDefRadio<N extends string = string> extends FilterDefBase<"radio", N> {
		values: string[]
	}
	
	type FilterDefToggle<N extends string = string> = FilterDefBase<"toggle", N>

	type FilterDefRange<N extends string = string> = FilterDefBase<"range", N>

	type FilterDefSearch<N extends string = string> = Omit<FilterDefBase<"full-text", N>, "path">

	type FilterDef<N extends string = string> = 
		| FilterDefCheckbox<N>
		| FilterDefRadio<N>
		| FilterDefToggle<N> 
		| FilterDefRange<N>
		| FilterDefSearch<N>
}

function defineFilters<
	N extends string,
	F extends FilterDef<N>
>(filtersDef: F[]): F[]
{
	return filtersDef;
}

export const filterDefs = defineFilters([
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
]);

//@ts-expect-error var 'global' cause type error.
global.filterDefs = filterDefs;
