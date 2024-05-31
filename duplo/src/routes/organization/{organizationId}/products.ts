import { hasOrganizationRoleByOrganizationId } from "@security/hasOrganizationRole/byOrganizationId";
import { productWithMoreSchema } from "@schemas/product";
import { stringBoolean } from "@utils/zod";

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
				sku: zod.string().optional(),
				withProductSheet: stringBoolean.optional(),
				withWarehouse: stringBoolean.optional(),
			}
		})
		.handler(
			async ({ pickup }) => {
				const { id: organizationId } = pickup("organization");
				const page = pickup("page");
				const sku = pickup("sku");
				const withProductSheet = pickup("withProductSheet");
				const withWarehouse = pickup("withWarehouse");
				
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
						productSheet: withProductSheet,
						warehouse: withWarehouse,
					},
				});
				throw new OkHttpException("products.found", products);
			},
			new IHaveSentThis(OkHttpException.code, "products.found", productWithMoreSchema.array())
		);
