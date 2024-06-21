import { accessTokenCheck } from "@checkers/token";
import { inputUser, userExistCheck } from "@checkers/user";

export const mustBeConnected = duplo
	.declareAbstractRoute("mustBeConnected")
	.extract(
		{
			headers: {
				"access-token": zod.string().ignore()
			}
		},
		() => {
			throw new UnauthorizedHttpException("access.token.invalid");
		}
	)
	.check(
		accessTokenCheck,
		{
			input: p => p("access-token"),
			...accessTokenCheck.preCompletions.mustBeValid
		},
		new IHaveSentThis(UnauthorizedHttpException.code, "access.token.invalid")
	)
	.check(
		userExistCheck,
		{
			input: p => inputUser.id(p("accessTokenContent").id),
			...userExistCheck.preCompletions.mustExist
		},
		new IHaveSentThis(NotFoundHttpException.code, "user.notfound")
	)
	.cut(({ pickup }) => ({ userId: pickup("user").id }), ["userId"])
	.build(["accessTokenContent", "user", "userId"]);
