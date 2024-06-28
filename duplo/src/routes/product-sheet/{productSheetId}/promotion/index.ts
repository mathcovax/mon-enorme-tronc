import { inputOrganization, organizationExistCheck } from "@checkers/organization";
import { promotionSchema } from "@schemas/promotion";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

/* METHOD : POST, PATH : /product-sheet/{productSheetId}/promotion */
export const POST = (method: Methods, path: string) => 
	hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"]  })
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				percentage: zod.number().min(0).max(1).positive(),
				startDate: zod.coerce.date(),
				endDate: zod.coerce.date(),
				organizationId: zod.string()
			}).strip(),
		})
		.check(
			organizationExistCheck,
			{
				input: p => inputOrganization.name(
					p("body").organizationId
				),
				result: "organization.notfound",
				catch: () => {
					throw new ConflictHttpException("organization.alreadyExist");
				}
			},
			new IHaveSentThis(ConflictHttpException.code, "organization.alreadyExist")
		)
		.cut(
			({ pickup }) => {
				const { startDate, endDate } = pickup("body");

				if (startDate > endDate ||
				startDate.getTime() === endDate.getTime() ||
				(startDate || endDate) < new Date(Date.now())
				) {
					throw new BadRequestHttpException("promotion.date.invalid");
				}

				return {};
			},
			[],
			new IHaveSentThis(BadRequestHttpException.code, "promotion.date.invalid")
		)
		.handler(
			async ({ pickup }) => {
				const { percentage, startDate, endDate, organizationId } = pickup("body");
				const { id: productSheetId } = pickup("productSheet");

				const promotion = await prisma.promotion.create({
					data: {
						percentage,
						startDate,
						endDate,
						organizationId: organizationId,
						productSheetId: productSheetId,
					}
				});

				await prisma.product_sheet.update({
					where: { id: productSheetId },
					data: { promotionId: promotion.id }
				});

				throw new CreatedHttpException("promotion.created", promotion);
			},
			new IHaveSentThis(CreatedHttpException.code, "promotion.created", promotionSchema)
		);
