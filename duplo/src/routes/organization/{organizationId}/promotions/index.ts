import { organizationHasUserCheck } from "@checkers/organization";
import { promotionSchema } from "@schemas/promotion";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : GET, PATH : /organization/{organizationId}/promotions */
export const GET = (method: Methods, path: string) => mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareRoute(method, path)
	.extract({
		params: {
			organizationId: zod.string(),
			page: zod.coerce.number().default(0),
		}
	})
	.check(
		organizationHasUserCheck,
		{
			input: p => ({ organizationId: p("organizationId"), userId: p("accessTokenContent").id }),
			...organizationHasUserCheck.preCompletions.mustHaveUser,
			result: "organization.hasUserWithMoreData",
			options: { selectUser: true }
		},
		new IHaveSentThis(NotAcceptableHttpException.code, "organization.hasNotUser")
	)
	.handler(
		async ({ pickup }) => {
			const organizationId = pickup("organizationId");
			const page = pickup("page");

			const promotions = await prisma.promotion.findMany({
				where: {
					organizationId: organizationId
				},
				select: {
					id: true,
					percentage: true,
					startDate: true,
					endDate: true,
					productSheet: {
						select: {
							id: true,
							name: true
						}
					}
				},
				take: 10,
				skip: page * 10
			});

			throw new OkHttpException("organization.promotions", promotions);
		}, 
		new IHaveSentThis(OkHttpException.code, "organization.promotions", promotionSchema.array())
	)
;
