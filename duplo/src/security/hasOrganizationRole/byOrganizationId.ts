import { mustBeConnected } from "@security/mustBeConnected";
import { OptionsHasOrganizationRole, hasOrganizationRole } from ".";
import { inputOrganization, organizationExistCheck } from "@checkers/organization";
import { onUseDuplose } from "@duplojs/editor-tools";
import { Route } from "@duplojs/duplojs";

export const hasOrganizationRoleByOrganizationId = 
	mustBeConnected({ pickup: ["accessTokenContent", "user"] })
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
		.build(["accessTokenContent", "organization", "user"]);

/* istanbul ignore if -- @preserve */
if (duplo.config.environment !== "TEST") {
	duplo.use(onUseDuplose, {
		duplose: hasOrganizationRoleByOrganizationId.abstractRoute,
		deep: 2,
		handler: (duplose) => {
			if (!(duplose instanceof Route)) {
				return;
			}
			
			duplose.paths.forEach((path) => {
				if (!path.includes("organizationId")) {
					throw new Error(`Params 'organizationId' is missing in path '${path}'.`);
				}
			});
		}
	});
}
