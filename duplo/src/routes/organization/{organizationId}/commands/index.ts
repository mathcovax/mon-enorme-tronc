import { inputWarehouse, warehouseExistCheck } from "@checkers/warehouse";
import { organizationCommandCollectionSchema } from "@schemas/organizationCommand";
import { hasOrganizationRoleByOrganizationId } from "@security/hasOrganizationRole/byOrganizationId";

/* METHOD : GET, PATH : /organization/{organizationId}/commands */
export const GET = (method: Methods, path: string) => 
	hasOrganizationRoleByOrganizationId({ options: { organizationRole: "STORE_KEEPER" }, pickup: ["organization"] })
		.declareRoute(method, path)
		.extract({
			query: {
				warehouseId: zod.string(),
				page: zod.coerce.number().default(0),
			}
		})
		.check(
			warehouseExistCheck,
			{
				input: p => inputWarehouse.id(
					p("warehouseId")
				),
				...warehouseExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "warehouse.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const { id: organizationId } = pickup("organization");
				const { id: warehouseId } = pickup("warehouse");
				const page = pickup("page");

				const organizationCommandCollection = await prisma.$queryRaw`
					WITH organizationCommandItems ("commandId", quantity) AS (
						SELECT
							ci."commandId" as "commandId",
							ci.quantity - ci."processQuantity" AS quantity
						FROM
							command_item AS ci
						INNER JOIN product_sheet AS ps ON ps.id = ci."productSheetId"
						WHERE 
							ps."organizationId" = ${organizationId}
							AND ps."warehouseId" = ${warehouseId}
							AND ci.quantity != ci."processQuantity"
					)

					SELECT 
						oci."commandId" as "commandId",
						SUM(oci.quantity)::INT as quantity,
						c."createdAt"
					FROM organizationCommandItems as oci
					INNER JOIN command as c ON c.id = oci."commandId"
					WHERE c.status = 'IN_PROGESS'
					GROUP BY oci."commandId", c."createdAt"
					ORDER BY c."createdAt"
					OFFSET ${page * 10}
					LIMIT 10
				`;

				throw new OkHttpException("organizationCommandCollection", organizationCommandCollection);
			},
			new IHaveSentThis(OkHttpException.code, "organizationCommandCollection", organizationCommandCollectionSchema)
		);
