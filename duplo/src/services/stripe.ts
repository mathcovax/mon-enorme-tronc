export const createCardSchema = zod.object({
	number: zod.string().length(16).regex(/^\d+$/),
	exp_month: zod.string().min(1).max(2).regex(/^\d+$/),
	exp_year: zod.string().length(4).regex(/^\d+$/),
	cvc: zod.string().length(3).regex(/^\d+$/),
});

export const addressSchema = zod.object({
	line1: zod.string(),
	city: zod.string(),
	postal_code: zod.string(),
	state: zod.string().optional(),
	country: zod.string(),
});

export const createCustomerSchema = zod.object({
	name: zod.string(),
	email: zod.string().email(),
	source: zod.string(),
	address: addressSchema,
});

export class Stripe {
	static async getCard(cardId: string) {
		return stripe.tokens.retrieve(cardId);
	}

	static async createCustomer(email: string, name: string) {
		return stripe.customers.create({
			email,
			name,
		});
	}

	static async createPaymentIntent(amount: number, customerId: string) {
		return stripe.paymentIntents.create({
			amount,
			currency: "eur",
			customer: customerId,
			payment_method_types: ["card"],
		});
	}

	static async webhook(signature: string, payload: string | Buffer, secret: string) {
		return stripe.webhooks.constructEvent(payload, signature, secret);
	}
}
