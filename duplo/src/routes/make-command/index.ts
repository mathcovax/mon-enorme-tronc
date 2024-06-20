import { sessionSchema } from "@schemas/session";
import { mustBeConnected } from "@security/mustBeConnected";
import { ProductAvailability } from "@services/productAvailability";
import { uuidv7 } from "uuidv7";

/* METHOD : POST, PATH : /make-command */
export const POST = (method: Methods, path: string) => 
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.cut(({ pickup }) => ({ userId: pickup("accessTokenContent").id }), ["userId"])
		.cut(
			async ({ pickup }) => {
				const userId = pickup("userId");
				const articleInCart = await prisma.article.groupBy({
					by: "productSheetId",
					where: {
						userId,
						commandId: null
					},
					_count: { productSheetId: true },
				});

				if (articleInCart.length < 1) {
					throw new ConflictHttpException("cart.empty");
				}

				return { articleInCart };
			},
			["articleInCart"],
			new IHaveSentThis(ConflictHttpException.code, "cart.empty"),
		)
		.cut(
			async ({ pickup }) => {
				const articleInCart = pickup("articleInCart");
				const userId = pickup("userId");
				await Promise.all(
					articleInCart.map(
						({ productSheetId, _count: { productSheetId: count } }) => 
							ProductAvailability
								.quantity(productSheetId, userId)
								.then(quantity => {
									if (quantity < count) {
										throw new ConflictHttpException("product.unavailable");
									}
								})
					)
				);
				return {};
			},
			[],
			new IHaveSentThis(ConflictHttpException.code, "product.unavailable"),
		)
		.cut(
			async ({ pickup }) => {
				const articleInCart = pickup("articleInCart");
				const userId = pickup("userId");
				const commandId = uuidv7();
				const priceAndQuantity = await Promise.all(
					articleInCart.map(
						aic => prisma.product_sheet.findUniqueOrThrow({
							where: { id: aic.productSheetId },
							select: { price: true },
						}).then(
							ps => ({ 
								quantity: aic._count.productSheetId, 
								price: ps.price
							})
						)
					)
				);

				const price = await stripe.prices.create({
					currency: "eur",
					unit_amount_decimal: priceAndQuantity.reduce((pv, cv) => pv + cv.price * cv.quantity, 0).toFixed(2),
					product_data: {
						name: `${userId} ${commandId}`
					}
				});

				return { price, commandId };
			},
			["price", "commandId"]
		)
		.handler(
			async ({ pickup }) => {
				const userId = pickup("userId");
				const commandId = pickup("commandId");
				const price = pickup("price");
				const session = await stripe.checkout.sessions.create({
					mode: "payment",
					line_items: [{ price: price.id }],
					success_url: `${ENV.ORIGIN}/command?sessionId={CHECKOUT_SESSION_ID}`,
					cancel_url: `${ENV.ORIGIN}/command?sessionId=canceled`,
				});
				
				await prisma.command.create({
					data: {
						id: commandId,
						userId,
						session: session.id,
					}
				});

				throw new CreatedHttpException("session", { sessionUrl: session.url });
			},
			new IHaveSentThis(CreatedHttpException.code, "session", sessionSchema)
		);
