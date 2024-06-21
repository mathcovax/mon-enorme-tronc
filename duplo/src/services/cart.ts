export class CartService {
	static getArticle(userId: string) {
		return prisma.article.groupBy({
			by: ["productSheetId"],
			where: {
				userId,
				command: null
			},
			_count: {
				productSheetId: true
			}
		}).then(
			articlesInCart => articlesInCart.map(aic => ({
				productSheetId: aic.productSheetId,
				quantity: aic._count.productSheetId
			}))
		); 
	}
}
