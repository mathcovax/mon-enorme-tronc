import { inputOrganization, organizationExistCheck } from "@checkers/organization";
import { inputUser, userExistCheck } from "@checkers/user";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : POST, PATH : /organization */
export const POST = (method: Methods, path: string) => hasPrimordialRole({ options: { primordialRole: "ADMIN" } })
	.declareRoute(method, path)
	.extract({
		body: zod.object({
			name: zod.string().min(2).max(255),
			ownerId: zod.string(),
		}).strip()
	})
	.check(
		organizationExistCheck,
		{
			input: p => inputOrganization.name(
				p("body").name
			),
			result: "organization.notfound",
			catch: () => {
				throw new ConflictHttpException("organization.alreadyExist");
			}
		},
		new IHaveSentThis(ConflictHttpException.code, "organization.alreadyExist")
	)
	.check(
		userExistCheck,
		{
			input: p => inputUser.id(
				p("body").ownerId
			),
			...userExistCheck.preCompletions.mustExist,
			indexing: "owner",
		},
		new IHaveSentThis(NotFoundHttpException.code, "user.notfound")
	)
	.cut(
		async ({ pickup }) => {
			const owner = pickup("owner");
			
			const hasOrganization = await prisma.organization.findFirst({
				where: {
					ownerId: owner.id
				}
			});

			if (hasOrganization) {
				throw new ConflictHttpException("user.alreadyOwner");
			}

			return {};
		},
		[],	
		new IHaveSentThis(ConflictHttpException.code, "user.alreadyOwner")
	)
	.handler(
		async ({ pickup }) => {
			const { name, ownerId } = pickup("body");

			await prisma.organization.create({
				data: {
					name,
					ownerId,
					userToOrganization: {
						create: {
							userId: ownerId,
							organizationRole: "OWNER",
						}
					}
				}
			});

			throw new CreatedHttpException("organization.created");
		}, 
		new IHaveSentThis(CreatedHttpException.code, "organization.created")
	);
