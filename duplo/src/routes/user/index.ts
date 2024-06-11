import { inputUser, userExistCheck } from "@checkers/user";
import { addressValidCheck } from "@checkers/address";
import { selfUserSchema } from "@schemas/user";
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

			const userOrganizationCount = await prisma.user_to_organization.count({
				where: {
					userId: user.id
				}
			});

			throw new OkHttpException("user", { ...user, hasOrganization: !!userOrganizationCount });
		},
		new IHaveSentThis(OkHttpException.code, "user", selfUserSchema)
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
		addressValidCheck,
		{
			input: p => p("body").address || "",
			result: "address.valid",
			catch: () => {
				throw new BadRequestHttpException("user.address.invalid");
			},
			skip: p => !p("body").address
		},
		new IHaveSentThis(BadRequestHttpException.code, "user.address.invalid")

	)
	.handler(
		async ({ pickup }) => {
			const { id } = pickup("accessTokenContent");
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

/* METHOD : DELETE, PATH : /user */
export const DELETE = (method: Methods, path: string) => mustBeConnected({ pickup: ["accessTokenContent"] })
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
			const { id } = pickup("accessTokenContent");

			await prisma.user.delete({
				where: {
					id,
				},
			});

			throw new OkHttpException("user.deleted");
		},
		new IHaveSentThis(OkHttpException.code, "user.deleted")
	);
