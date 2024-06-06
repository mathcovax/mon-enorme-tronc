//@ts-expect-error var 'global' cause type error.
global.prisma = prisma.$extends({
	query: {
		$allModels: {
			create({ args, query, model }) {
				if (model === "product") {
					return query(args).then(result => {
						prisma.product_sheet.update({
							where: {
								id: args.data.productSheetId
							},
							data: {
								updatedAt: new Date()
							}
						});
						return result;
					});
				}
				else {
					return query(args);
				}
			},
			update({ args, query, model }) {
				if (model === "product") {
					const alteredArgs = {
						...args,
						select: args.select 
							? {
								...args.select,
								productSheetId: true,
							}
							: undefined
					};

					return query(alteredArgs).then(result => {
						prisma.product_sheet.update({
							where: {
								id: result.productSheetId
							},
							data: {
								updatedAt: new Date()
							}
						});
						return result;
					});
				}
				else {
					return query(args);
				}
			},
		}
	}
});
