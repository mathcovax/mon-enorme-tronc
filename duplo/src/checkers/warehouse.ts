import { GetTypeInput, createTypeInput } from "@duplojs/type-input";
import { Prisma } from "@prisma/client";

export const inputWarehouse = createTypeInput()
	.add<"id", string>()
	.add<"name", string>()
	.build();

export const warehouseExistCheck = duplo
	.createChecker("warehouseExist")
	.handler(async ({ name, value }: GetTypeInput<typeof inputWarehouse>, output) => {
		let where: Prisma.warehouseFindFirstArgs["where"];

		if (name === "id") {
			where = {
				id: value
			};
		}
		else if (name === "name") {
			where = {
				name: value
			};
		}

		const warehouse = await prisma.warehouse.findFirst({
			where,
		});

		if (warehouse) {
			return output("warehouse.exist", warehouse);
		} else {
			return output("warehouse.notfound", null);
		}
	})
	.preCompletion(
		"mustExist",
		{
			result: "warehouse.exist",
			catch: () => {
				throw new NotFoundHttpException("warehouse.notfound");
			},
			indexing: "warehouse",
		}
	)
	.build();
