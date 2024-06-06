import { prisma } from "../prismaClient";
import { organization_role } from "@prisma/client";

const roles = Object.values(organization_role).filter(role => role !== "OWNER");

export const makeUserToOrganization = (
	userId: string,
	organizationId: string
) => 
	prisma.user_to_organization.create({
		data: {
			userId,
			organizationId,
			organizationRole: roles[Math.floor(Math.random() * roles.length)]
		}
	});
