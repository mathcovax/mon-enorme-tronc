import { navigationItemSchema } from "@schemas/navigationItem";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : GET, PATH : /navigation-items */
export const GET = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.handler(
			async () => {
				const navigationItems = await prisma.navigation_item.findMany({ take: 10, orderBy: { priority: "asc" } });

				throw new OkHttpException("navigationItems", navigationItems);
			},
			new IHaveSentThis(OkHttpException.code, "navigationItems", navigationItemSchema.array())
		);
