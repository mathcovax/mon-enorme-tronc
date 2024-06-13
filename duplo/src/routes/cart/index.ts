import { mustBeConnected } from "@security/mustBeConnected";
import { cartSchema } from "@schemas/cart";

/* METHOD : GET, PATH : /cart */
export const GET = (method: Methods, path: string) => mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareRoute(method, path)
	.handler(
		async ({ pickup }) => {
			const { id: userId } = pickup("accessTokenContent");

			const cart = await prisma.$queryRaw<Zod.infer<typeof cartSchema>[]>`
				WITH user_article AS (
					SELECT 
						"productSheetId", 
						"userId", 
						CAST(COUNT(*) AS INTEGER) AS quantity 
					FROM 
						"article" 
					WHERE 
						"userId" = ${userId}
					GROUP BY 
						"productSheetId", 
						"userId"
				)
				SELECT 
					ua."productSheetId", 
					ua.quantity, 
					ps."name",
					ps."description",
					ps."shortDescription",
					ps."price",
					(SELECT url FROM "image_product_sheet" WHERE "productSheetId" = ua."productSheetId" LIMIT 1) AS "imageUrl"
				FROM 
					user_article ua
				INNER JOIN 
					"product_sheet" ps 
				ON 
					ps."id" = ua."productSheetId"
			`;

			throw new OkHttpException("cart.fetched", cart);
		},
		new IHaveSentThis(OkHttpException.code, "cart.fetched", cartSchema.array())
	);
