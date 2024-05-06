import { addressValidCheck } from "@checkers/address";
import { firebaseTokenCheck } from "@checkers/token";
import { inputUser, userExistCheck } from "@checkers/user";

/* METHOD : POST, PATH : /register */
export const POST = (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.extract({
		body: zod.object({
			fireBaseIdToken: zod.string(),
			lastname: zod.string().max(32),
			firstname: zod.string().max(36),
			age: zod.number().positive().max(130),
			address: zod.string().max(400)
		})
	})
	.check(
		firebaseTokenCheck,
		{
			input: p => p("body").fireBaseIdToken,
			result: "firebase.token.valid",
			catch: (res, info) => {
				throw new UnauthorizedHttpException(info);
			},
			indexing: "decodedIdToken",
		},
		new IHaveSentThis(UnauthorizedHttpException.code, "firebase.token.invalid")
	)
	.check(
		userExistCheck,
		{
			input: p => inputUser.email(p("decodedIdToken").email),
			result: "user.notfound",
			catch: () => {
				throw new ConflictHttpException("user.alreadyExist");
			}
		},
		new IHaveSentThis(ConflictHttpException.code, "user.alreadyExist")
	)
	.check(
		addressValidCheck,
		{
			input: p => p("body").address,
			result: "address.valid",
			catch: () => {
				throw new BadRequestHttpException("user.invalid.address");
			}
		},
		new IHaveSentThis(BadRequestHttpException.code, "user.invalid.address")

	)
	.handler(
		async ({ pickup }) => {
			const user = pickup("body");
			const { email } = pickup("decodedIdToken");

			await prisma.user.create({
				data: {
					email,
					lastname: user.lastname,
					firstname: user.firstname,
					age: user.age,
					address: user.address
				}
			});

			throw new CreatedHttpException("user.registered");
		},
	);
