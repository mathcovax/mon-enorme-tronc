import { categoryExistCheck } from "@checkers/category";
import { navigationItemExistCheck } from "@checkers/navigationItem";
import { parentCategoryExistCheck } from "@checkers/parentCategory";
import { navigationItemSchema } from "@schemas/navigationItem";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : PUT, PATH : /navigation-item/{navigationItemTitle} */
export const PUT = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			params: {
				navigationItemTitle: zod.string()
			},
			body: navigationItemSchema
		})
		.check(
			navigationItemExistCheck,
			{
				input: p => p("navigationItemTitle"),
				...navigationItemExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "navigationItem.notfound")
		)
		.check(
			navigationItemExistCheck,
			{
				input: p => p("body").title,
				result: "navigationItem.notfound",
				catch: () => {
					throw new ConflictHttpException("navigationItem.title.alreadyUse");
				},
				skip: p => p("navigationItemTitle") === p("body").title
			},
			new IHaveSentThis(ConflictHttpException.code, "navigationItem.title.alreadyUse")
		)
		.check(
			categoryExistCheck,
			{
				input: p => {
					const navigationItem = p("body");
					if (navigationItem.type === "CATEGORY") {
						return navigationItem.categoryName;
					}
					return "";
				},
				...categoryExistCheck.preCompletions.mustExist,
				skip: p => p("body").type !== "CATEGORY"
			},
			new IHaveSentThis(NotFoundHttpException.code, "category.notfound")
		)
		.check(
			parentCategoryExistCheck,
			{
				input: p => {
					const navigationItem = p("body");
					if (navigationItem.type === "PARENT_CATEGORY") {
						return navigationItem.parentCategoryName;
					}
					return "";
				},
				...parentCategoryExistCheck.preCompletions.mustExist,
				skip: p => p("body").type !== "PARENT_CATEGORY"
			},
			new IHaveSentThis(NotFoundHttpException.code, "parentCategory.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const navigationItemTitle = pickup("navigationItemTitle");
				const newNavigationItem = pickup("body");

				await prisma.navigation_item.update({
					where: {
						title: navigationItemTitle
					},
					data: {
						parentCategoryName: null,
						categoryName: null,
						url: null,
						...newNavigationItem
					}
				});

				throw new NoContentHttpException("navigationItem.edited");
			},
			new IHaveSentThis(NoContentHttpException.code, "navigationItem.edited")
		);

/* METHOD : DELETE, PATH : /navigation-item/{navigationItemTitle} */
export const DELETE = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			params: {
				navigationItemTitle: zod.string()
			}
		})
		.check(
			navigationItemExistCheck,
			{
				input: p => p("navigationItemTitle"),
				...navigationItemExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "navigationItem.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const navigationItemTitle = pickup("navigationItemTitle");
	
				await prisma.navigation_item.delete({
					where: {
						title: navigationItemTitle
					}
				});
	
				throw new NoContentHttpException("navigationItem.delete");
			},
			new IHaveSentThis(NoContentHttpException.code, "navigationItem.delete")
		);
