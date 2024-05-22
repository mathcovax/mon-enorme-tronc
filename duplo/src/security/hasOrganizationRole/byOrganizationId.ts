import { mustBeConnected } from "@security/mustBeConnected";
import { OptionsHasOrganizationRole, hasOrganizationRole } from ".";
import { inputOrganization, organizationExistCheck } from "@checkers/organization";

export const hasOrganizationRoleByOrganizationId = 
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareAbstractRoute("hasOrganizationRoleByOrganizationId")
		.options<OptionsHasOrganizationRole>({
			organizationRole: "OWNER"
		})
		.extract({
			params: {
				organizationId: zod.string()
			}
		})
		.check(
			organizationExistCheck,
			{
				input: (p) => inputOrganization.id(p("organizationId")),
				...organizationExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "organization.notfound")
		)
		.process(
			hasOrganizationRole,
			{
				input: p => ({
					organizationId: p("organization").id,
					userId: p("accessTokenContent").id
				}),
				options: p => ({ organizationRole: p("options").organizationRole })
			}
		)
		.build(["accessTokenContent", "organization"]);
