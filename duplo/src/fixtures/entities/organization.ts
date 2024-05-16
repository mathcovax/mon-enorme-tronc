import type { organization } from "@prisma/client";
import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";

export const makeOrganization = (ownerId: string, organization?: Partial<organization>) => prisma.organization.create({
	data: {
		name: organization?.name || faker.company.name(),
		ownerId,
	}, 
	select: {
		id: true
	}
});
