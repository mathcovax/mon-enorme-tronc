
/* METHOD : GET, PATH : /user */
export const GET = (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.handler(
		() => {
			throw new OkHttpException("user.get");
		},
		new IHaveSentThis(OkHttpException.code, "user.get")
	);
