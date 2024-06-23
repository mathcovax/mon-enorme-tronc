import { addressValidCheck } from "@checkers/address";
import { fullProductSheetModel } from "@mongoose/model";
import { sessionSchema } from "@schemas/session";
import { mustBeConnected } from "@security/mustBeConnected";
import { CartService } from "@services/cart";
import { uuidv7 } from "uuidv7";

/* METHOD : POST, PATH : /make-command */
export const POST = (method: Methods, path: string) => 
	mustBeConnected({ pickup: ["user"] })
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				lastname: zod.string().max(32).toUpperCase(),
				firstname: zod.string().max(36).toLowerCase(),
				address: zod.string().max(400),
			}).strip()
		})
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
		.cut(({ pickup }) => ({ cartService: new CartService(pickup("user").id) }), ["cartService"])
		.cut(
			async ({ pickup }) => {
				const articlesInCart = await pickup("cartService").getArticlesInCart();

				if (articlesInCart.length < 1) {
					throw new ConflictHttpException("cart.empty");
				}

				return { articlesInCart };
			},
			["articlesInCart"],
			new IHaveSentThis(ConflictHttpException.code, "cart.empty"),
		)
		.cut(
			async ({ pickup }) => {
				const articlesAvailable = await pickup("cartService").articlesAvailableInCart();

				if (!articlesAvailable) {
					throw new ConflictHttpException("products.unavailable");
				}
				
				return {};
			},
			[],
			new IHaveSentThis(ConflictHttpException.code, "products.unavailable"),
		)
		.handler(
			async ({ pickup }) => {
				const user = pickup("user");
				const articlesInCart = pickup("articlesInCart");
				const computedPrice = await pickup("cartService").computedPrice();
				const commandId = uuidv7();
				const { firstname, lastname, address } = pickup("body");

				const price = await stripe.prices.create({
					currency: "eur",
					unit_amount_decimal: computedPrice,
					product_data: {
						name: "Mon énorme tronc"
					}
				});

				const session = await stripe.checkout.sessions.create({
					mode: "payment",
					line_items: [{ price: price.id, quantity: 1 }],
					success_url: `${ENV.ORIGIN}/orders?sessionId={CHECKOUT_SESSION_ID}`,
					cancel_url: `${ENV.ORIGIN}/orders?sessionId=canceled`,
					customer_email: user.email,
					metadata: {
						commandId
					}
				});
				
				await prisma.command.create({
					data: {
						id: commandId,
						firstname,
						lastname,
						address,
						userId: user.id,
						stripeSessionId: session.id,
					}
				});

				await Promise.all([
					...articlesInCart.map(
						aic =>
							fullProductSheetModel
								.findOne({ id: aic.productSheetId })
								.then(
									fps => prisma.command_item.create({
										data: {
											commandId,
											userId: user.id,
											productSheetId: aic.productSheetId,
											quantity: aic.quantity,
											freezeProductSheet: JSON.stringify(fps),
										}
									})
								)
							
					),
					prisma.article.deleteMany({
						where: {
							userId: user.id
						}
					})
				]);

				throw new CreatedHttpException("session", { sessionUrl: session.url });
			},
			new IHaveSentThis(CreatedHttpException.code, "session", sessionSchema)
		);
