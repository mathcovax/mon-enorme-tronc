import { zod } from "@duplojs/duplojs";

export const hasRoleSecurity = duplo
	.declareAbstractRoute("isAdmin")
	.options<{role?: "admin" | "user"}>({})
	.extract({
		headers: {
			role: zod.enum(["admin", "user"]).default("user")
		},
	})
	.cut(   
		({pickup}) => {
			if(pickup("role") !== pickup("options").role){
				throw new UnauthorizedHttpException("role.wrong");
			}
		},
		undefined,
		new IHaveSentThis(UnauthorizedHttpException.code, "role.wrong")
	)
	.build();
