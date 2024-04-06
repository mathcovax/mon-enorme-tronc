
/* METHOD : POST, PATH : /login */
export const POST = (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.extract({
		body: zod.string()
	})
	.handler(
		({pickup}) => {
			throw new OkHttpException("user.login", "my_super_token");
		},
		new IHaveSentThis(OkHttpException.code, "user.login", zod.number())
	);
