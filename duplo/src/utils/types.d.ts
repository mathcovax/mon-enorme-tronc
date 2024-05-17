import { UnionToIntersection } from "@duplojs/duplojs";

export {};
declare global {
	type UninonToEnum<T extends string> = { [prop in T]: prop };
	type LastOf<T> =
		UnionToIntersection<T extends unknown ? () => T : never> extends () => (infer R) ? R : never
	type Push<T extends unknown[], V> = [...T, V];
	export type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
		true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>
}
