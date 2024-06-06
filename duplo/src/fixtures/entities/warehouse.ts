import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";
import type { warehouse } from "@prisma/client";

export const makeWarehouse = (
	organizationId: string,
	warehouse?: Partial<warehouse>
) => 
	prisma.warehouse.create({
		data: {
			name: warehouse?.name || faker.company.name(),
			address: warehouse?.address || faker.location.streetAddress(),
			organizationId,
		}
	});
