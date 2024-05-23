import { hasOrganizationRoleByOrganizationId } from "@security/hasOrganizationRole/byOrganizationId";
import { warehouseSchema } from "@schemas/warehouseSchema";

/* METHOD : GET, PATH : /organization/{organizationId}/warehouses */
export const GET = (method: Methods, path: string) =>
	hasOrganizationRoleByOrganizationId({ 
		options: { organizationRole: "STORE_KEEPER" }, 
		pickup: ["organization"] 
	})
		.declareRoute(method, path)
		.extract({
			query: {
				page: zod.coerce.number().default(0),
				name: zod.string().optional()
			}
		})
		.handler(
			async ({ pickup }) => {
				const { id: organizationId } = pickup("organization");
				const page = pickup("page");
				const name = pickup("name");

				const warehouse = await prisma.warehouse.findMany({
					where: {
						organizationId,
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
				throw new OkHttpException("warehouses.found", warehouse);
			},
			new IHaveSentThis(OkHttpException.code, "warehouses.found", warehouseSchema.array())
		);
