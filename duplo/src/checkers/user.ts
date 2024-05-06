import { createTypeInput, GetTypeInput } from "@duplojs/type-input";
import { Prisma } from "@prisma/client";

export const inputUser = createTypeInput()
	.add<"id", string>()
	.add<"email", string>()
	.build();

export const userExistCheck = duplo
	.createChecker("userExist")
	.handler(async ({ name, value }: GetTypeInput<typeof inputUser>, output) => {
		let where: Prisma.UserFindFirstArgs["where"];

		if (name === "id") {
			where = {
				id: value
			};
		}
		else if (name === "email") {
			where = {
				email: value
			};
		}

		const user = await prisma.user.findFirst({
			where,
		});

		if (user) {
			return output("user.exist", user);
		}
		else {
			return output("user.notfound", null);
		}
	})
	.build();
