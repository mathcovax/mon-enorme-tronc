import { prisma } from "../prisma-client";
import { faker } from "@faker-js/faker";

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	created_at: Date;
	updated_at: Date;
}

export const makeProducts = async (nb: number) => {
	const products = [] as Product[];

	for (let i = 0; i < nb; i++) {
		const product = await prisma.product.create({
			data: {
				name: faker.commerce.productName(),
				price: parseFloat(faker.commerce.price()),
				description: faker.commerce.productDescription()
			}
		});

		products.push(product);
	}

	return products;
};

export const assignProductToCategory = async (productId: string, categoryId: string) => {
	await prisma.product_to_category.create({
		data: {
			product: {
				connect: {
					id: productId
				}
			},
			category: {
				connect: {
					id: categoryId
				}
			}
		}
	});
};
