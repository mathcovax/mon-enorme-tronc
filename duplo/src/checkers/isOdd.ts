export const isOddCheck = duplo
	.createChecker("isOdd")
	.handler((input: number, output) => {
		if(input % 2 === 0){
			return output("odd", undefined);
		}
		else {
			return output("notOdd", undefined);
		}
	})
	.preCompletion(
		"whantOdd",
		{
			result: "odd",
			catch: (res, info) => {
				throw new BadRequestHttpException(info);
			}
		}
	)
	.build();
