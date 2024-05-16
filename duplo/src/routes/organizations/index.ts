import { organizationSchema } from "@schemas/organization";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : GET, PATH : /organizations */
export const GET = (method: Methods, path: string) => hasPrimordialRole({ options: { primordialRole: "ADMIN" } })
	.declareRoute(method, path)
	.extract({
		query: {
			page: zod.coerce.number().default(0),
			name: zod.coerce.string().optional(),
		}
	})
	.handler(
		async ({ pickup }) => {
			const page = pickup("page");
			const name = pickup("name");

			const organizations = await prisma.organization.findMany({
				where: {
					name: name
						? {
							contains: name,
							mode: "insensitive"	
						}  
						: undefined
				},
				take: 10,
				skip: page * 10
			});

			throw new OkHttpException("organizations", organizations);
		},
		new IHaveSentThis(OkHttpException.code, "organizations", organizationSchema.array())
	);


