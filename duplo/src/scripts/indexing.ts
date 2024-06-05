import { FindSlice } from "@utils/findSlice";

const generator = FindSlice(
	50, 
	(slice, size) => prisma.product_sheet.findMany({
		where: {
			organization: {
				suspended: false
			},
			status: {
				not: "REMOVE"
			}
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
			categories: {
				select: {
					categoryName: true
				}
			},
			_count: {
				select: {
					products: true
				}
			}
		},
		take: size,
		skip: slice * size
	})
);

for await (const productSheet of generator) {
	
}
