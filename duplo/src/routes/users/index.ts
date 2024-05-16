import { primordialRolesTuple, userSchema } from "@schemas/user";
import { hasPrimordialRole } from "@security/hasPrimordialRole";
import { zodToArray } from "@utils/zod";

/* METHOD : GET, PATH : /users */
export const GET = (method: Methods, path: string) => hasPrimordialRole({ options: { primordialRole: "ADMIN" } })
	.declareRoute(method, path)
	.extract({
		query: {
			page: zod.coerce.number().default(0),
			email: zod.string().optional(),
			primordialRole: zodToArray(zod.enum(primordialRolesTuple)).optional()
		}
	})
	.handler(
		async ({ pickup }) => {
			const page = pickup("page");
			const searchEmail = pickup("email");
			const primordialRole = pickup("primordialRole");

			const users = await prisma.user.findMany({
				where: {
					email: searchEmail
						? {
							contains: searchEmail,
							mode: "insensitive",
						}
						: undefined,
					AND: {
						OR: primordialRole?.map(pr => ({
							primordialRole: pr
						}))
					}
				},
				take: 10,
				skip: page * 10
			});

			throw new OkHttpException("users", users);
		},
		new IHaveSentThis(OkHttpException.code, "users", userSchema.array())
	);
