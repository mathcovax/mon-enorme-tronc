import { mustBeConnected } from "@security/mustBeConnected";
import { ProductAvailability } from "@services/productAvailability";

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
		.handler(
			async ({ pickup }) => {
				const userId = pickup("userId");
				const session = await stripe.checkout.sessions.create({
					
				});
				
				await prisma.command.create({
					data: {
						userId,
						session: session.id,
					}
				});
			}
		);
