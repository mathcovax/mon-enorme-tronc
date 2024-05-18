import { organization_role } from "@prisma/client";

export const organizationSchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	label: zod.string().nullable(),
	ownerId: zod.string(),
	suspended: zod.boolean(),
});

export const organizationRolesTuple: TuplifyUnion<organization_role> = [
	"STORE_KEEPER", "PRODUCT_SHEET_MANAGER", "ACCOUNTANT", "OWNER"
];

export const organizationRolesEnum: UninonToEnum<organization_role> = {
	STORE_KEEPER: "STORE_KEEPER",
	PRODUCT_SHEET_MANAGER: "PRODUCT_SHEET_MANAGER",
	ACCOUNTANT: "ACCOUNTANT",
	OWNER: "OWNER",
};
