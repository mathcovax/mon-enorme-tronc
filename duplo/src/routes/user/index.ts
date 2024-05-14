import { inputUser, userExistCheck } from "@checkers/user";
import { userSchema } from "@schemas/user";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : GET, PATH : /user */
export const GET = (method: Methods, path: string) => mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareRoute(method, path)
	.check(
		userExistCheck,
		{
			input: p => inputUser.id(
				p("accessTokenContent").id
			),
			...userExistCheck.preCompletions.mustExist
		},
		new IHaveSentThis(NotFoundHttpException.code, "user.notfound")
	)
	.handler(
		async ({ pickup }) => {
			const user = pickup("user");

			throw new OkHttpException("user", user);
		},
		new IHaveSentThis(OkHttpException.code, "user", userSchema)
	);
