import { hasOrganizationRoleByOrganizationId } from "@security/hasOrganizationRole/byOrganizationId";
import { productAndProductSheetNameSchema } from "@schemas/product";

/* METHOD : GET, PATH : /organization/{organizationId}/products */
export const GET = (method: Methods, path: string) =>
	hasOrganizationRoleByOrganizationId({ 
		options: { organizationRole: "STORE_KEEPER" }, 
		pickup: ["organization"] 
	})
		.declareRoute(method, path)
		.extract({
			query: {
				page: zod.coerce.number().default(0),
				sku: zod.string().optional()
			}
		})
		.handler(
			async ({ pickup }) => {
				const { id: organizationId } = pickup("organization");
				const page = pickup("page");
				const sku = pickup("sku");
				
				const products = await prisma.product.findMany({
					where: {
						organizationId,
						sku: sku
							? {
								contains: sku,
								mode: "insensitive"
							}
							: undefined
					},
					take: 10,
					skip: page * 10,
					include: {
						productSheet: {
							select: {
								name: true,
							},
						},
						warehouse: {
							select: {
								name: true,
							},
						},
					},
				});
				throw new OkHttpException("products.found", products);
			},
			new IHaveSentThis(OkHttpException.code, "products.found", productAndProductSheetNameSchema.array())
		);
