import { organizationHasUserCheck } from "@checkers/organization";
import { accessTokenCheck } from "@checkers/token";
import { hasOrganizationRole } from "@security/hasOrganizationRole";
import { hasPrimordialRole } from "@security/hasPrimordialRole";
import { mustBeConnected } from "@security/mustBeConnected";

export const adminPanelEntry = hasPrimordialRole({ options: { primordialRole: "ADMIN" } })
	.declareRoute("GET", "/entry/admin-panel*")
	.handler(
		() => {
			throw new NoContentHttpException("entry.accepted");
		},
		new IHaveSentThis(NoContentHttpException.code, "entry.accepted"),
		new SwaggerIgnore(),
	);

export const contentPanelEntry = hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
	.declareRoute("GET", "/entry/content-panel*")
	.handler(
		() => {
			throw new NoContentHttpException("entry.accepted");
		},
		new IHaveSentThis(NoContentHttpException.code, "entry.accepted"),
		new SwaggerIgnore(),
	);

export const organizationAdminEntry = mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareRoute("GET", ["/entry/organization/{organizationId}/manage-user"])
	.extract({
		params: {
			organizationId: zod.string(),
		}
	})
	.process(
		hasOrganizationRole,
		{
			input: p => ({ organizationId: p("organizationId"), userId: p("accessTokenContent").id }),
			options: { organizationRole: "OWNER" }
		}
	)
	.handler(
		async () => {
			throw new NoContentHttpException("entry.accepted");
		},
		new IHaveSentThis(NoContentHttpException.code, "entry.accepted"),
		new SwaggerIgnore(),
	);

export const organizationEntry = mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareRoute("GET", "/entry/organization/{organizationId}*")
	.extract({
		params: {
			organizationId: zod.string(),
		}
	})
	.check(
		organizationHasUserCheck,
		{
			input: p => ({ organizationId: p("organizationId"), userId: p("accessTokenContent").id }),
			result: "organization.hasUser",
			catch: () => {
				throw new UnauthorizedHttpException("entry.refuse");
			}
		},
		new IHaveSentThis(UnauthorizedHttpException.code, "entry.refuse"),
	)
	.handler(
		async () => {
			throw new NoContentHttpException("entry.accepted");
		},
		new IHaveSentThis(NoContentHttpException.code, "entry.accepted"),
		new SwaggerIgnore(),
	);

export const authEntry = duplo
	.declareRoute("GET", ["/entry/login", "/entry/register"])
	.extract({
		headers: {
			"access-token": zod.string().default("").ignore()
		}
	})
	.check(
		accessTokenCheck,
		{
			input: p => p("access-token"),
			result: "access.token.invalid",
			catch: () => {
				throw new UnauthorizedHttpException("entry.refuse");
			}
		}
	)
	.handler(
		() => {
			throw new NoContentHttpException("entry.accepted");
		},
		new IHaveSentThis(NoContentHttpException.code, "entry.accepted"),
		new SwaggerIgnore(),
	);

export const basicEntry = duplo
	.declareRoute("GET", "/entry*")
	.handler(
		() => {
			throw new NoContentHttpException("entry.accepted");
		},
		new IHaveSentThis(NoContentHttpException.code, "entry.accepted"),
		new SwaggerIgnore(),
	);
