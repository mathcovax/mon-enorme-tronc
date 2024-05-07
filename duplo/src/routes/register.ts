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
			address: zod.string().max(400),
			dateOfBirth: zod.coerce.date(),
		}).passthrough(),
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
				throw new BadRequestHttpException("user.address.invalid");
			}
		},
		new IHaveSentThis(BadRequestHttpException.code, "user.address.invalid")

	)
	.cut(
		({ pickup }) => {
			const userDateOfBirth = pickup("body").dateOfBirth;
			const timestamp18year = 568036800000;
			
			if(Date.now() - userDateOfBirth.getTime() < timestamp18year) {
				throw new BadRequestHttpException("user.dateOfBirth.invalid");
			}

			return {};
		},
		[],
		new IHaveSentThis(BadRequestHttpException.code, "user.dateOfBirth.invalid")
	)
	.handler(
		async ({ pickup }) => {
			const { email } = pickup("decodedIdToken");
			const { lastname, firstname, address, dateOfBirth } = pickup("body");

			await prisma.user.create({
				data: {
					email,
					lastname,
					firstname,
					address,
					dateOfBirth: new Date(
						dateOfBirth.getFullYear(), 
						dateOfBirth.getMonth(), 
						dateOfBirth.getDate()
					)
				}
			});

			throw new CreatedHttpException("user.registered");
		},
	);
