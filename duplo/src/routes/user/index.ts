import { inputUser, userExistCheck } from "@checkers/user";
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
			const { dateOfBirth, ...user } = pickup("user");

			throw new OkHttpException("user", { ...user, dateOfBirth: dateOfBirth.toISOString() });
		},
		new IHaveSentThis(OkHttpException.code, "user", userSchema)
	);

const userSchema = zod.object({
	id: zod.string(),
	email: zod.string(),
	lastname: zod.string(),
	firstname: zod.string(),
	dateOfBirth: zod.string(),
	address: zod.string(),
	primordialRole: zod.string(),
});
