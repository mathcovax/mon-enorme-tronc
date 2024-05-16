export interface ColDef<V = unknown> {
	title: string,
	getter?: (item: V) => unknown
	slotName?: string
	cols?: number
}

declare global {
	type BigTableColDef<T extends object> = ColDef<T>;
}
