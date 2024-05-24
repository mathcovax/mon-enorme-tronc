import { imageProductSheetSchema } from "@schemas/imagesProductSheet";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

/* METHOD : GET, PATH : /product-sheet/{productSheetId}/images */
export const GET = (method: Methods, path: string) => 
	hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"] })
		.declareRoute(method, path)
		.handler(
			async ({ pickup }) => {
				const { id: productSheetId } = pickup("productSheet");

				const imagesProductSheet = await prisma.image_product_sheet.findMany({
					where: {
						productSheetId
					},
					take: 6
				});

				throw new OkHttpException("productSheet.images", imagesProductSheet);
			},
			new IHaveSentThis(OkHttpException.code, "productSheet.images", imageProductSheetSchema.array())
		);
