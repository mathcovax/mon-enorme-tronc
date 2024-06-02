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

/* METHOD : PATCH, PATH : /user */
export const PATCH = (method: Methods, path: string) => mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareRoute(method, path)
	.extract(
		{
			body: zod.object({
				lastname: zod.string().min(2).max(255).optional(),
				firstname: zod.string().min(2).max(255).optional(),
				address: zod.string().optional(),
			}).strip().default({}),
		}
	)
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
			const { id } = pickup("user");
			const { lastname, firstname, address } = pickup("body");

			await prisma.user.update({
				where: {
					id,
				},
				data: {
					lastname,
					firstname,
					address,
				},
			});

			throw new CreatedHttpException("user.edited", id);
		},
		new IHaveSentThis(CreatedHttpException.code, "user.edited", zod.string())
	);
