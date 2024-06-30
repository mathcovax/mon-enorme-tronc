import "./setup";
import { FindSlice } from "@utils/findSlice";
import { mongoose } from "./setup/mongoose";
import { prisma } from "./setup/prismaClient";
import { fullProductSheetModel } from "@mongoose/model";
import { FullProductSheetSchema } from "@schemas/fullProductSheet";
import { facetTypeTuple } from "@schemas/facet";
import { facet_type } from "@prisma/client";
import { LastTime } from "./setup/lastTime";

const newLastIndexing = new Date();
const lastTime = new LastTime("indexingProductSheet");
const lastIndexing = await lastTime.get();

const generator = FindSlice(
	500, 
	(slice, size) => prisma.product_sheet.findMany({
		where: {
			organization: {
				suspended: false
			},
			status: {
				not: "REMOVE"
			},
			updatedAt: {
				gte: lastIndexing
			},
		},
		include: {
			organization: {
				select: {
					name: true,
					label: true,
					logoUrl: true,
				}
			},
			facets: {
				select: {
					type: true,
					value: true,
				}
			},
			images: {
				select: {
					url: true
				}
			},
			promotion: {
				select: {
					percentage: true,
					startDate: true,
					endDate: true
				}
			},
			categories: {
				select: {
					categoryName: true
				}
			},
			_count: {
				select: {
					products: {
						where: {
							status: "IN_STOCK"
						}
					}
				}
			}
		},
		take: size,
		skip: slice * size
	})
);

let promiseList: unknown[] = [];

for await (const productSheet of generator) {
	if (productSheet.images.length === 0) {
		continue;
	}

	const fullProductSheet: FullProductSheetSchema = {
		id: productSheet.id,
		name: productSheet.name,
		description: productSheet.description,
		shortDescription: productSheet.shortDescription,
		price: productSheet.price,
		quantity: productSheet._count.products,
		categories: productSheet.categories.map(c => c.categoryName),
		images: productSheet.images.map(i => i.url),
		promotion: promotionWithClosestStartDate,
		organization: {
			id: productSheet.organizationId,
			name: productSheet.organization.name,
			label: productSheet.organization.label ?? undefined,
			logoUrl: productSheet.organization.logoUrl ?? undefined
		},
		facets: facetTypeTuple.reduce(
			(pv, ft) => ({
				...pv, 
				[ft]: productSheet.facets.find(f => f.type === ft)?.value
			}),
			{} as { [P in facet_type]?: string}
		)
	};
	
	promiseList.push(
		fullProductSheetModel.findOneAndUpdate(
			{ id: productSheet.id }, 
			fullProductSheet, 
			{ new: true, upsert: true }
		)
	);

	if (promiseList.length > 1000) {
		await Promise.all(promiseList);
		promiseList = [];
	}
}

await Promise.all(promiseList);
lastTime.set(newLastIndexing);

mongoose.connection.close();

