import type { organization, organization_role } from "@prisma/client";
import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";

export const makeOrganization = async (
	ownerId: string,
	organization?: Partial<organization>
) => {
	const newOrganization = await prisma.organization.create({
		data: {
			name: organization?.name || faker.company.name(),
			ownerId,
		},
		select: {
			id: true,
		},
	});

	await addUserToOrganization(ownerId, newOrganization.id, "OWNER");

	return newOrganization;
};

export const addUserToOrganization = (userId: string, organizationId: string, role: organization_role) => 
	prisma.user_to_organization.create({
		data: {
			userId,
			organizationId,
			organizationRole: role
		}
	});
	
export const organizationRolesTuple: TuplifyUnion<organization_role> = [
	"STORE_KEEPER",
	"PRODUCT_SHEET_MANAGER",
	"ACCOUNTANT",
	"OWNER",
];
