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
			result: "user.exist",
			catch: () => {
				throw new NotFoundHttpException("user.notfound");
			},
			indexing: "user"
		},
		new IHaveSentThis(NotFoundHttpException.code, "user.notfound", zod.string())
	)
	.handler(
		({ pickup }) => {
			const { id, email } = pickup("user");
			const accessToken = AccessToken.generate({ id, email });

			throw new OkHttpException("user.login", accessToken);
		},
		new IHaveSentThis(OkHttpException.code, "user.login", zod.string())
	);
