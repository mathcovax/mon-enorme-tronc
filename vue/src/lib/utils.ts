import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { GetDef, GetResponseByInfo } from "./duploTo/EnrichedDuploTo";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function promiseWithResolvers<T = void>() {
	let resolve: (value: T) => void = () => undefined;
	let reject: (error?: unknown) => void = () => undefined;

	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return { promise, resolve, reject };
}

declare global {
  type UnionToIntersection<U> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;
  type LastOf<T> = UnionToIntersection<
    T extends unknown ? () => T : never
  > extends () => infer R
    ? R
    : never;
  type Push<T extends unknown[], V> = [...T, V];
  export type TuplifyUnion<
    T,
    L = LastOf<T>,
    N = [T] extends [never] ? true : false
  > = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>;
}

export type Organization = GetResponseByInfo<
  GetDef<"GET", "/organizations">,
  "organizations"
>["body"][number];

export type User = GetResponseByInfo<
	GetDef<"GET", "/user">,
	"user"
>["body"]

export type PrimordialRole = User["primordialRole"];

export const primordialRoles: TuplifyUnion<PrimordialRole> = [
	"CUSTOMER",
	"MODERATOR",
	"CONTENTS_MASTER",
	"ADMIN",
];

export type Category = GetResponseByInfo<
  GetDef<"GET", "/categories">,
  "categories"
>["body"][number];

export type OrganizationUser = GetResponseByInfo<
  GetDef<"GET", "/organization/{organizationId}/users">,
  "organization.users"
>["body"][number];

export type OrganizationRole = OrganizationUser["organizationRole"];

export const organizationRoles: TuplifyUnion<OrganizationRole> = [
	"STORE_KEEPER",
	"PRODUCT_SHEET_MANAGER",
	"ACCOUNTANT",
	"OWNER"
];
