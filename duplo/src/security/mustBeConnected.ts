import { accessTokenCheck } from "@checkers/token";

export const mustBeConnected = duplo
	.declareAbstractRoute("mustBeConnected")
	.extract({
		headers: {
			"access-token": zod.string()
		}
	})
	.check(
		accessTokenCheck,
		{
			input: p => p("access-token"),
			...accessTokenCheck.preCompletions.mustBeValid
		},
		new IHaveSentThis(UnauthorizedHttpException.code, "access.token.invalid")
	)
	.build(["accessTokenContent"]);
