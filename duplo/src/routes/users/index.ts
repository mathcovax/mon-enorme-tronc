import { userSchema } from "@schemas/user";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : GET, PATH : /users */
export const GET = (method: Methods, path: string) => hasPrimordialRole({ options: { primordialRole: "ADMIN" } })
	.declareRoute(method, path)
	.extract({
		query: {
			page: zod.coerce.number().default(0),
			email: zod.string().optional(),
		}
	})
	.handler(
		async ({ pickup }) => {
			const page = pickup("page");
			const searchEmail = pickup("email");

			const users = await prisma.user.findMany({
				where: {
					email: searchEmail
						? {
							contains: searchEmail,
							mode: "insensitive",
						}
						: undefined
				},
				take: 10,
				skip: page * 10
			});

			throw new OkHttpException("users", users);
		},
		new IHaveSentThis(OkHttpException.code, "users", userSchema.array())
	);
