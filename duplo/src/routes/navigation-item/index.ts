import { navigationItemExistCheck } from "@checkers/navigationItem";
import { navigationItemSchema } from "@schemas/navigationItem";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : POST, PATH : /navigation-item */
export const POST = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			body: navigationItemSchema
		})
		.cut(
			async () => {
				const navigationItemCount = await prisma.navigation_item.count();

				if (navigationItemCount > 9) {
					throw new ConflictHttpException("navigationItem.limit");
				}

				return {};
			},
			[],
			new IHaveSentThis(ConflictHttpException.code, "navigationItem.limit")
		)
		.check(
			navigationItemExistCheck,
			{
				input: p => p("body").title,
				result: "navigationItem.notfound",
				catch: () => {
					throw new ConflictHttpException("navigationItem.title.alreadyUse");
				}
			},
			new IHaveSentThis(ConflictHttpException.code, "navigationItem.title.alreadyUse")
		)
		.handler(
			async ({ pickup }) => {
				const newNavigationItem = pickup("body");

				const navigationItem = await prisma.navigation_item.create({ data: newNavigationItem });

				throw new CreatedHttpException("navigationItem.created", navigationItem);
			},
			new IHaveSentThis(ConflictHttpException.code, "navigationItem.created", navigationItemSchema)
		);
