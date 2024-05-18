import { organizationHasUserCheck } from "@checkers/organization";
import { organizationRolesEnum } from "@schemas/organization";
import { hasOrganizationRole } from "@security/hasOrganizationRole";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : POST, PATH : /organization/{organizationId}/user/{userId} */
export const POST = (method: Methods, path: string) => 
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				organizationId: zod.string(),
				userId: zod.string(),
			}, 
			body: zod.object({
				organizationRole: zod.enum([
					organizationRolesEnum.STORE_KEEPER,
					organizationRolesEnum.PRODUCT_SHEET_MANAGER,
					organizationRolesEnum.ACCOUNTANT,
				])
			}).passthrough()
		})
		.process(
			hasOrganizationRole,
			{
				input: p => ({ 
					organizationId: p("organizationId"), 
					userId: p("accessTokenContent").id 
				}),
				options: { organizationRole: "OWNER" }
			}
		)
		.check(
			organizationHasUserCheck,
			{
				input: p => ({ organizationId: p("organizationId"), userId: p("userId") }),
				result: "organization.hasNotUser",
				catch: () => {
					throw new ConflictHttpException("organization.hasAlreadyUser");
				}
			}, 
			new IHaveSentThis(ConflictHttpException.code, "organization.hasAlreadyUser")
		)
		.handler(
			async ({ pickup }) => {
				const organizationId = pickup("organizationId");
				const userId = pickup("userId");
				const { organizationRole } = pickup("body");

				await prisma.user_to_organization.create({
					data: {
						organizationId,
						userId,
						organizationRole,
					}
				});

				throw new CreatedHttpException("organization.user.add");
			}, 
			new IHaveSentThis(CreatedHttpException.code, "organization.user.add")
		);

/* METHOD : PATCH, PATH : /organization/{organizationId}/user/{userId} */
export const PATCH = (method: Methods, path: string) => 
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				organizationId: zod.string(),
				userId: zod.string(),
			}, 
			body: zod.object({
				organizationRole: zod.enum([
					organizationRolesEnum.STORE_KEEPER,
					organizationRolesEnum.PRODUCT_SHEET_MANAGER,
					organizationRolesEnum.ACCOUNTANT,
				]).optional()
			}).passthrough().default({})
		})
		.process(
			hasOrganizationRole,
			{
				input: p => ({ 
					organizationId: p("organizationId"), 
					userId: p("accessTokenContent").id 
				}),
				options: { organizationRole: "OWNER" }
			}
		)
		.check(
			organizationHasUserCheck,
			{
				input: p => ({ organizationId: p("organizationId"), userId: p("userId") }),
				...organizationHasUserCheck.preCompletions.mustHaveUser
			}, 
			new IHaveSentThis(NotAcceptableHttpException.code, "organization.hasNotUser")
		)
		.handler(
			async ({ pickup }) => {
				const organizationId = pickup("organizationId");
				const userId = pickup("userId");
				const { organizationRole } = pickup("body");

				await prisma.user_to_organization.update({
					where: {
						userId_organizationId: {
							organizationId,
							userId,
						}
					},
					data: {
						organizationRole,
					}
				});

				throw new CreatedHttpException("organization.user.edited");
			}, 
			new IHaveSentThis(CreatedHttpException.code, "organization.user.edited")
		);
