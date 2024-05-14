import { GetTypeInput, createTypeInput } from "@duplojs/type-input";
import { Prisma } from "@prisma/client";

export const inputOrganization = createTypeInput()
	.add<"id", string>()
	.add<"name", string>()
	.build();

export const organizationExistCheck = duplo
	.createChecker("organizationExist")
	.handler(async ({ name, value }: GetTypeInput<typeof inputOrganization>, output) => {
		let where: Prisma.organizationFindFirstArgs["where"];

		if (name === "id") {
			where = {
				id: value
			};
		}
		else if (name === "name") {
			where = {
				name: value
			};
		}

		const organization = await prisma.organization.findFirst({
			where,
		});

		if(organization){
			return output("organization.exist", organization);
		}
		else {
			return output("organization.notfound", null);
		}
	})
	.preCompletion(
		"wantExist",
		{
			result: "organization.exist",
			catch: () => {
				throw new NotFoundHttpException("organization.notfound");
			},
			indexing: "organization"
		}
	)
	.build();
