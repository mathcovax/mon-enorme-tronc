import { organizationUserSchema } from "@schemas/organization";
import { hasOrganizationRoleByOrganizationId } from "@security/hasOrganizationRole/byOrganizationId";

/* METHOD : GET, PATH : /organization/{organizationId}/users */
export const GET = (method: Methods, path: string) => 
	hasOrganizationRoleByOrganizationId({ pickup: ["organization"] })
		.declareRoute(method, path)
		.extract({
			query: {
				page: zod.coerce.number().default(0),
				email: zod.coerce.string().optional(),
			}
		})
		.handler(
			async ({ pickup }) => {
				const { id: organizationId } = pickup("organization");
				const page = pickup("page");
				const email = pickup("email");

				const users = await prisma.user_to_organization.findMany({
					where: {
						organizationId,
						user: email 
							? {
								email: {
									contains: email,
									mode: "insensitive",
								}
							}
							: undefined
					},
					select: {
						organizationRole: true,
						user: true
					},
					take: 10,
					skip: page * 10,
				}).then(
					userToOrganizationCollection => userToOrganizationCollection.map(
						v => ({ 
							id: v.user.id, 
							email: v.user.email,
							firstname: v.user.firstname,
							lastname: v.user.lastname,
							organizationRole: v.organizationRole 
						})
					)
				);

				throw new OkHttpException("organization.users", users);
			},
			new IHaveSentThis(OkHttpException.code, "organization.users", organizationUserSchema.array())
		);
