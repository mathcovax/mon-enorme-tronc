import { mustBeConnected } from "@security/mustBeConnected";
import { OptionsHasOrganizationRole, hasOrganizationRole } from ".";
import { onUseDuplose } from "@duplojs/editor-tools";
import { Route } from "@duplojs/duplojs";
import { productExistCheck, inputProduct } from "@checkers/product";

export const hasOrganizationRoleByProductId = 
mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareAbstractRoute("hasOrganizationRoleByProductId")
	.options<OptionsHasOrganizationRole>({
		organizationRole: "STORE_KEEPER"
	})
	.extract({
		params: {
			productId: zod.string()
		}
	})
	.check(
		productExistCheck,
		{
			input: (p) => inputProduct.id(p("productId")),
			...productExistCheck.preCompletions.mustExist
		},
		new IHaveSentThis(NotFoundHttpException.code, "product.notfound")
	)
	.process(
		hasOrganizationRole,
		{
			input: p => ({
				organizationId: p("product").organizationId,
				userId: p("accessTokenContent").id
			}),
			options: p => ({ organizationRole: p("options").organizationRole })
		}
	)
	.build(["accessTokenContent", "product"]);

/* istanbul ignore if -- @preserve */		
if (duplo.config.environment !== "TEST") {
	duplo.use(onUseDuplose, {
		duplose: hasOrganizationRoleByProductId.abstractRoute,
		deep: 2,
		handler: (duplose) => {
			if (!(duplose instanceof Route)) {
				return;
			}
	
			duplose.paths.forEach((path) => {
				if (!path.includes("productId")) {
					throw new Error(`Params 'productId' is missing in path '${path}'.`);
				}
			});
		}
	});
}
