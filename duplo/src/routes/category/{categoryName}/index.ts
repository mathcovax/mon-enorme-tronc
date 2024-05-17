import { categoryExistCheck } from "@checkers/category";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : PATCH, PATH : /category/{categoryName} */
export const PATCH = (method: Methods, path: string) => hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
	.declareRoute(method, path)
	.extract({
		params: {
			categoryName: zod.string()
		},
		body: zod.object({
			name: zod.string().min(3).max(255).optional(),
			disabled: zod.boolean().optional()
		}).passthrough()
	})
	.check(
		categoryExistCheck,
		{
			input: p => p("categoryName"),
			...categoryExistCheck.preCompletions.mustExist
		},
		new IHaveSentThis(NotFoundHttpException.code, "category.notfound")
	)
	.check(
		categoryExistCheck,
		{
			input: p => p("body").name || "",
			result: "category.notfound",
			catch: () => {
				throw new ConflictHttpException("category.alreadyExist");
			},
			skip: p => !p("body").name || p("body").name === p("categoryName")
		},
		new IHaveSentThis(ConflictHttpException.code, "category.alreadyExist")
	)
	.handler(
		async ({ pickup }) => {
			const categoryName = pickup("categoryName");
			const { name, disabled } = pickup("body");
			
			await prisma.category.update({
				where: {
					name: categoryName,
				},
				data: {
					name,
					disabled
				}
			});

			throw new NoContentHttpException("category.edited");
		},
		new IHaveSentThis(NoContentHttpException.code, "category.edited")
	);
