import { primordial_role } from "@prisma/client";

export const primordialRolesTuple: TuplifyUnion<primordial_role> = [
	"CUSTOMER", "MODERATOR", "CATEGORIES_MASTER", "ADMIN"
];

export const primordialRolesEnum: { [prop in primordial_role]: prop } = {
	CUSTOMER: "CUSTOMER",
	MODERATOR: "MODERATOR",
	CATEGORIES_MASTER: "CATEGORIES_MASTER",
	ADMIN: "ADMIN",
};

export const userSchema = zod.object({
	id: zod.string(),
	email: zod.string(),
	lastname: zod.string(),
	firstname: zod.string(),
	dateOfBirth: zod.coerce.string(),
	address: zod.string(),
	primordialRole: zod.enum(primordialRolesTuple),
	muted: zod.boolean(),
});
