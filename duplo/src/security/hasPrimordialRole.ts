import { primordial_role } from "@prisma/client";
import { mustBeConnected } from "./mustBeConnected";

interface HasPrimordialRoleOptions{
	primordialRole: primordial_role
}

const primordialRolesPriority: primordial_role[] = [
	"CUSTOMER",
	"ADMIN",
];

export const hasPrimordialRole = mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareAbstractRoute("hasPrimordialRole")
	.options<HasPrimordialRoleOptions>({
		primordialRole: "ADMIN"
	})
	.cut(
		({ pickup }) => {
			const { primordialRole: userPrimordialRole } = pickup("accessTokenContent");
			const { primordialRole: currentPrimordialRole } = pickup("options");

			const currentAccess = primordialRolesPriority.indexOf(currentPrimordialRole);
			const userAccess = primordialRolesPriority.indexOf(userPrimordialRole);

			if(userAccess < currentAccess){
				throw new UnauthorizedHttpException("user.role.invalid");
			}

			return {};
		},
		[],
		new IHaveSentThis(UnauthorizedHttpException.code, "user.role.invalid")
	)
	.build(["accessTokenContent"]);
