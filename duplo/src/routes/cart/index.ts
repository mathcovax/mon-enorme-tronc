import { mustBeConnected } from "@security/mustBeConnected";
import { cartSchema } from "@schemas/cart";

/* METHOD : GET, PATH : /cart */
export const GET = (method: Methods, path: string) => mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareRoute(method, path)
	.handler(
		async ({ pickup }) => {
			const { id: userId } = pickup("accessTokenContent");

			const cart = await prisma.$queryRaw<Zod.infer<typeof cartSchema>[]>`
				WITH userArticle AS (
					SELECT 
						"productSheetId", 
						"userId", 
						CAST(COUNT(*) AS INTEGER) AS quantity 
					FROM article
					WHERE "userId" = ${userId}
					GROUP BY 
						"productSheetId", 
						"userId"
				), promotions AS (
					SELECT
						p."productSheetId" as "productSheetId",
						percentage,
						ROW_NUMBER() OVER ( PARTITION BY p."productSheetId" ORDER BY p."startDate" DESC ) AS "rowNumber"
					FROM promotion AS p
					INNER JOIN userArticle AS ua ON p."productSheetId" = ua."productSheetId"
					WHERE
						p."startDate" <= CURRENT_DATE
						AND p."endDate" >= CURRENT_DATE
				)

				SELECT 
					ua."productSheetId", 
					ua.quantity, 
					ps.name,
					ps.description,
					ps."shortDescription",
					CASE
						WHEN p.percentage IS NULL THEN ps."price"
						ELSE ps."price" * p.percentage / 100
					END AS price,
					(SELECT url FROM "image_product_sheet" WHERE "productSheetId" = ua."productSheetId" LIMIT 1) AS "imageUrl"
				FROM userArticle AS ua
				INNER JOIN "product_sheet" AS ps ON ps."id" = ua."productSheetId"
				LEFT JOIN promotions AS p ON p."rowNumber" = 1 AND p."productSheetId" = ua."productSheetId"
			`;

			throw new OkHttpException("cart.fetched", cart);
		},
		new IHaveSentThis(OkHttpException.code, "cart.fetched", cartSchema.array())
	);
