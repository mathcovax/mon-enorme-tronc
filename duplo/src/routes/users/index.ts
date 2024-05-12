import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : GET, PATH : /users */
export const GET = (method: Methods, path: string) => hasPrimordialRole({ options: { primordialRole: "ADMIN" } })
	.declareRoute(method, path)
	.extract({
		query: {
			email: zod.string().optional(),
		}
	})
	.handler(
		async ({ pickup }) => {
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
			});

			throw new OkHttpException("users", users);
		},
		new IHaveSentThis(OkHttpException.code, "users", userSchema.array())
	);

const userSchema = zod.object({
	id: zod.string(),
	email: zod.string(),
	lastname: zod.string(),
	firstname: zod.string(),
	dateOfBirth: zod.coerce.string(),
	address: zod.string(),
	primordialRole: zod.string(),
});
