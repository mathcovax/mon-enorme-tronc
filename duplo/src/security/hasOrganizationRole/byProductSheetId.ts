import { mustBeConnected } from "@security/mustBeConnected";
import { OptionsHasOrganizationRole, hasOrganizationRole } from ".";
import { inputProductSheet, productSheetExistCheck } from "@checkers/productSheet";

export const hasOrganizationRoleByProductSheetId = 
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareAbstractRoute("hasOrganizationRoleByProductSheetId")
		.options<OptionsHasOrganizationRole>({
			organizationRole: "PRODUCT_SHEET_MANAGER"
		})
		.extract({
			params: {
				productSheetId: zod.string()
			}
		})
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("productSheetId")),
				...productSheetExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "productSheet.notfound")
		)
		.process(
			hasOrganizationRole,
			{
				input: p => ({
					organizationId: p("productSheet").organizationId,
					userId: p("accessTokenContent").id
				}),
				options: p => ({ organizationRole: p("options").organizationRole })
			}
		)
		.build(["accessTokenContent", "productSheet"]);
