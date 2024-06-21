import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : POST, PATH : /stripe-webhook */
export const POST = (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.extract({
		headers: {
			"stripe-signature": zod.string()
		},
	})
	.handler(
		async ({ pickup }) => {
			console.log("stripe-webhook");
			console.log(pickup("stripe-signature"));

			throw new OkHttpException("checkout.success");
		},
		new IHaveSentThis(OkHttpException.code, "checkout.success")
	);
