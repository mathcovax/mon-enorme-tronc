import { firebaseTokenCheck } from "@checkers/token";
import { inputUser, userExistCheck } from "@checkers/user";
import { AccessToken } from "@services/token";

/* METHOD : POST, PATH : /login */
export const POST = (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.extract({
		body: zod.string()
	})
	.check(
		firebaseTokenCheck,
		{
			input: p => p("body"),
			result: "firebase.token.valide",
			catch: (res, info) => {
				throw new UnauthorizedHttpException(info);
			},
			indexing: "decodedIdToken",
		},
		new IHaveSentThis(UnauthorizedHttpException.code, "firebase.token.invalide")
	)
	.check(
		userExistCheck,
		{
			input: p => inputUser.email(
				p("decodedIdToken").email
			),
			catch: () => undefined,
			indexing: "user"
		}
	)
	.cut(
		async ({pickup}) => {
			const user = pickup("user");
			
			if(!user){
				const email = pickup("decodedIdToken").email;

				const user = await prisma.user.create({
					data: {email}
				});
				
				return {
					user
				};
			}
		},
		["user"]
	)
	.handler(
		({pickup}) => {
			const {id, email} = pickup("user");
			const accessToken = AccessToken.generate({id, email});
			throw new OkHttpException("user.login", accessToken);
		},
		new IHaveSentThis(OkHttpException.code, "user.login", zod.string())
	);
