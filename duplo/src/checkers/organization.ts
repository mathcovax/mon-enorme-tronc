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

export interface InputHasOrganizationRole {
	organizationId: string
	userId: string
}

export const organizationHasUserCheck = duplo
	.createChecker("organizationHasUser")
	.handler(async ({ userId, organizationId }: InputHasOrganizationRole, output) => {
		const user_to_organization = await prisma.user_to_organization.findFirst({
			where: {
				userId,
				organizationId,
			}
		});

		if(user_to_organization){
			return output("organization.hasUser", user_to_organization);
		}
		else {
			return output("organization.hasNotUser", null);
		}
	})
	.preCompletion(
		"mustHaveUser",
		{
			result: "organization.hasUser",
			catch: () => {
				throw new NotAcceptableHttpException("organization.hasNotUser");
			},
			indexing: "userToOrganization"
		}
	)
	.build();
