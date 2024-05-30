import { NavigationBarItem, navigationBarItemSchema } from "@schemas/navigationBar";

/* METHOD : GET, PATH : /navigation-bar */
export const GET = (method: Methods, path: string) => 
	duplo
		.declareRoute(method, path)
		.handler(
			async () => {
				const navigationBar = await prisma.navigation_item.findMany({
					take: 10,
					orderBy: {
						priority: "asc"
					},
					select: {
						type: true,
						categoryName: true,
						parentCategoryName: true,
						parentCategory: {
							select: {
								categories: {
									take: 10,
									select: {
										category: {
											select: {
												name: true,
												imageUrl: true
											}
										}
									},
								},
							}
						},
						url: true,
						title: true,
					}
				}).then(navigationItemCollection => 
					navigationItemCollection.map((navigationItem): NavigationBarItem => {
						if (
							navigationItem.type === "PARENT_CATEGORY" && 
							navigationItem.parentCategory &&
							navigationItem.parentCategoryName
						) {
							return {
								type: "PARENT_CATEGORY",
								parentCategoryName: navigationItem.parentCategoryName,
								categories: navigationItem.parentCategory.categories.map(
									({ category: { name, imageUrl } }) => ({ 
										categoryName: name, 
										categoryImageUrl: imageUrl ?? ""
									})
								)
							};
						}
						else if (
							navigationItem.type === "CATEGORY" &&
							navigationItem.categoryName
						) {
							return {
								type: "CATEGORY",
								categoryName: navigationItem.categoryName
							};
						}
						else if (
							navigationItem.type === "LINK" &&
							navigationItem.title &&
							navigationItem.url
						) {
							return {
								type: "LINK",
								title: navigationItem.title,
								url: navigationItem.url,
							};
						}
						
						throw new Error("Invalide NavigationBarItem");
					})
				); 

				throw new OkHttpException("navigationBar", navigationBar);
			},
			new IHaveSentThis(OkHttpException.code, "navigationBar", navigationBarItemSchema.array())
		);
