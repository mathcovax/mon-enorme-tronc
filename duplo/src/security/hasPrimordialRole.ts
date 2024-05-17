import { primordial_role } from "@prisma/client";
import { mustBeConnected } from "./mustBeConnected";

interface HasPrimordialRoleOptions {
	primordialRole: primordial_role
}

const primordialRolesHierarchy: Record<primordial_role, primordial_role[]> = {
	CUSTOMER: [],
	MODERATOR: ["CUSTOMER"],
	CATEGORIES_MASTER: ["CUSTOMER"],
	ADMIN: ["CATEGORIES_MASTER", "MODERATOR", "CUSTOMER"],
};

export const hasPrimordialRole = mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareAbstractRoute("hasPrimordialRole")
	.options<HasPrimordialRoleOptions>({
		primordialRole: "ADMIN"
	})
	.cut(
		({ pickup }) => {
			const { primordialRole: userPrimordialRole } = pickup("accessTokenContent");
			const { primordialRole: currentPrimordialRole } = pickup("options");

			if (
				userPrimordialRole !== currentPrimordialRole &&
				!primordialRolesHierarchy[userPrimordialRole].includes(currentPrimordialRole)
			) {
				throw new UnauthorizedHttpException("user.role.invalid");
			}

			return {};
		},
		[],
		new IHaveSentThis(UnauthorizedHttpException.code, "user.role.invalid")
	)
	.build(["accessTokenContent"]);
