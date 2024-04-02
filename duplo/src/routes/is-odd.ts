import { isOddCheck } from "@checkers/isOdd";
import { methods, zod } from "@duplojs/duplojs";
import { hasRoleSecurity } from "@security/hasRole";

/* METHOD : GET, PATH : /is-odd */
export const GET = (method: methods, path: string) => hasRoleSecurity({options: {role: "user"}})
	.declareRoute(method, path)
	.extract({
		query: {
			number: zod.coerce.number()
		}
	})
	.check(
		isOddCheck,
		{
			input: p => p("number"),
			...isOddCheck.preCompletions.whantOdd,
		},
		new IHaveSentThis(BadRequestHttpException.code, "notOdd")
	)
	.handler(
		({pickup}) => {
			throw new OkHttpException("odd", pickup("number"));
		},
		new IHaveSentThis(OkHttpException.code, "odd", zod.number())
	);
