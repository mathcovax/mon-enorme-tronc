import { organizationHasUserCheck } from "@checkers/organization";
import { inputUser, userExistCheck } from "@checkers/user";
import { organizationRolesEnum } from "@schemas/organization";
import { hasOrganizationRole } from "@security/hasOrganizationRole";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : POST, PATH : /organization/{organizationId}/user */
export const POST = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				organizationId: zod.string(),
			},
			body: zod.object({
				email: zod.string(),
				firstname: zod.string(),
				lastname: zod.string(),
				organizationRole: zod.enum([
					organizationRolesEnum.STORE_KEEPER,
					organizationRolesEnum.PRODUCT_SHEET_MANAGER,
					organizationRolesEnum.ACCOUNTANT,
				]),
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
			userExistCheck,
			{
				input: p => inputUser.EFL({
					email: p("body").email,
					firstname: p("body").firstname,
					lastname: p("body").lastname,
				}),
				...userExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "user.notfound")
		)
		.check(
			organizationHasUserCheck,
			{
				input: p => ({ organizationId: p("organizationId"), userId: p("user").id }),
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
				const { organizationRole } = pickup("body");
				const { id: userId } = pickup("user");

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