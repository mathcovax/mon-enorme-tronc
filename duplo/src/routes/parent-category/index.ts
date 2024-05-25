import { parentCategoryExistCheck } from "@checkers/parentCategory";
import { parentCategorySchema } from "@schemas/parentCategory";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : POST, PATH : /parent-category */
export const POST = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				name: zod.string(),
			}).strip()
		})
		.check(
			parentCategoryExistCheck, 
			{
				input: p => p("body").name,
				result: "parentCategory.notfound",
				catch: () => {
					throw new ConflictHttpException("parentCategory.name.alreadyUse");
				},
			},
			new IHaveSentThis(ConflictHttpException.code, "parentCategory.name.alreadyUse")
		)
		.handler(
			async ({ pickup }) => {
				const { name: parentCategoryName } = pickup("body");

				const parentCategory = await prisma.parent_category.create({
					data: {
						name: parentCategoryName
					}
				});

				throw new CreatedHttpException("parentCategory.created", parentCategory);
			},
			new IHaveSentThis(CreatedHttpException.code, "parentCategory.created", parentCategorySchema)
		);
