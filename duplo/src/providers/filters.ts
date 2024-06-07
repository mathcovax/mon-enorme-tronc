declare global {
	const filters: (typeof import("./filters"))["filters"];
}

//@ts-expect-error var 'global' cause type error.
export const filters = global.filters = [
	{
		type: "Checkbox",
		name: "Color",
		values: [
			"red", "blue", "green", "yellow", "black", "white"
		]
	},
	{
		type: "Radio",
		name: "Size",
		values: ["small", "medium", "large"]
	},
	{
		type: "Toggle",
		name: "Diameter",
		values: [
			"20mm", "30mm", "40mm", "50mm", "60mm"
		]
	},
	{
		type: "Checkbox",
		name: "Target",
		values: ["man", "woman", "man/woman"]
	},
	{
		type: "Checkbox",
		name: "Accessory",
		values: [
			"case", "bag", "stand", "gloves"
		]
	},
	{
		type: "Checkbox",
		name: "Material",
		values: ["wood", "plastic"]
	},
	{
		type: "Toggle",
		name: "Stimulation",
		value: "vibrating"
	}
];
