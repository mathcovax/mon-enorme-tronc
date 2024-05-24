import { mustBeConnected } from "@security/mustBeConnected";
import { OptionsHasOrganizationRole, hasOrganizationRole } from ".";
import { warehouseExistCheck, inputWarehouse } from "@checkers/warehouse";

export const hasOrganizationRoleByWarehouseId =
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareAbstractRoute("hasOrganizationRoleByWarehouseId")
		.options<OptionsHasOrganizationRole>({
			organizationRole: "OWNER"
		})
		.extract({
			params: {
				warehouseId: zod.string()
			}
		})
		.check(
			warehouseExistCheck,
			{
				input: (p) => inputWarehouse.id(p("warehouseId")),
				...warehouseExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "warehouse.notfound")
		)
		.process(
			hasOrganizationRole,
			{
				input: p => ({
					organizationId: p("warehouse").organizationId,
					userId: p("accessTokenContent").id
				}),
				options: p => ({ organizationRole: p("options").organizationRole })
			}
		)
		.build(["accessTokenContent", "warehouse"]);
