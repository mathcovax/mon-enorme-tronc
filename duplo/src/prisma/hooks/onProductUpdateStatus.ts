import { productStatusChangeModel } from "@mongoose/model";

//@ts-expect-error var 'global' cause type error.
global.prisma = prisma.$extends({
	query: {
		product: {
			async update({ query, args }) {
				if (args.data.status) {
					const product = await prisma.product.findUnique({
						where: args.where,
						include: {
							productSheet: true
						}
					});

					if (product && args.data.status !== product.status) {
						productStatusChangeModel.create({
							sku: product.sku,
							from: product.status,
							to: args.data.status,
							date: new Date(),
							productSheet: {
								id: product.productSheet.id,
								name: product.productSheet.name,
								organizationId: product.productSheet.organizationId,
							}
						});
					}
				}

				return await query(args);
			}
		}
	}
});
