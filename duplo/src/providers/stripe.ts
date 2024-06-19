import Stripe from "stripe";

declare global {
	const stripe: (typeof import("./stripe"))["stripe"];
}

//@ts-expect-error var 'global' cause type error.
export const stripe = global.stripe = new Stripe(ENV.STRIPE_PRIVATE_API_KEY);

duplo.addHook("beforeListenHttpServer", async () => {
	try {
		await stripe.customers.retrieve("test");
	} catch (e) {
		if (e instanceof Stripe.errors.StripeError && e.statusCode === 401) {
			throw new Error("Stripe connection error");
		}
	}
});
