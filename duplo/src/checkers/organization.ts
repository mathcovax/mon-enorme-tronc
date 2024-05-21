import { GetTypeInput, createTypeInput } from "@duplojs/type-input";
import { Prisma } from "@prisma/client";

export const inputOrganization = createTypeInput().add<"id", string>().add<"name", string>().build();

export const organizationExistCheck = duplo
	.createChecker("organizationExist")
	.handler(async ({ name, value }: GetTypeInput<typeof inputOrganization>, output) => {
		let where: Prisma.organizationFindFirstArgs["where"];

		if (name === "id") {
			where = {
				id: value,
			};
		} else if (name === "name") {
			where = {
				name: value,
			};
		}

		const organization = await prisma.organization.findFirst({
			where,
		});

		if (organization) {
			return output("organization.exist", organization);
		} else {
			return output("organization.notfound", null);
		}
	})
	.preCompletion("wantExist", {
		result: "organization.exist",
		catch: () => {
			throw new NotFoundHttpException("organization.notfound");
		},
		indexing: "organization",
	})
	.build();

export interface InputOrganizationHasUser {
  organizationId: string;
  userId: string;
}

export interface OptionsOrganizationHasUser {
  selectUser?: boolean;
}

export const organizationHasUserCheck = duplo
	.createChecker("organizationHasUser")
	.options<OptionsOrganizationHasUser>({})
	.handler(async ({ userId, organizationId }: InputOrganizationHasUser, output, options) => {
		const userToOrganization = await prisma.user_to_organization.findFirst({
			where: {
				userId,
				organizationId,
			},
			select: {
				userId: true,
				organizationId: true,
				organizationRole: true,
				user: !!options.selectUser,
			},
		});

		if (userToOrganization && userToOrganization.user) {
			return output("organization.hasUserWithMoreData", userToOrganization);
		} else if (userToOrganization && !userToOrganization.user) {
			return output("organization.hasUser", { ...userToOrganization, user: undefined });
		} else {
			return output("organization.hasNotUser", null);
		}
	})
	.preCompletion("mustHaveUser", {
		result: "organization.hasUser",
		catch: () => {
			throw new NotAcceptableHttpException("organization.hasNotUser");
		},
		indexing: "userToOrganization",
	})
	.build();
