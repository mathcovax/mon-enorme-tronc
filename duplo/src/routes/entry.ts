import { accessTokenCheck } from "@checkers/token";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

export const adminPanelEntry = hasPrimordialRole({ options: { primordialRole: "ADMIN" } })
	.declareRoute("GET", "/entry/admin-panel*")
	.handler(
		() => {
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
