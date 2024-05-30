import { categoryExistCheck } from "@checkers/category";
import { categorySchema } from "@schemas/category";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : POST, PATH : /category */
export const POST = (method: Methods, path: string) => hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
	.declareRoute(method, path)
	.extract({
		body: zod.object({
			name: zod.string().min(3).max(255),
			disabled: zod.boolean()
		}).strip()
	})
	.check(
		categoryExistCheck,
		{
			input: p => p("body").name,
			result: "category.notfound",
			catch: () => {
				throw new ConflictHttpException("category.alreadyExist");
			}
		},
		new IHaveSentThis(ConflictHttpException.code, "category.alreadyExist")
	)
	.handler(
		async ({ pickup }) => {
			const { name, disabled } = pickup("body");
			
			const category = await prisma.category.create({
				data: {
					name,
					disabled
				}
			});

			throw new CreatedHttpException("category.created", category);
		},
		new IHaveSentThis(CreatedHttpException.code, "category.created", categorySchema)
	);
