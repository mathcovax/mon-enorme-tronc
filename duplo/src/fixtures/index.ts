import { AnyFunction } from "@duplojs/duplojs";
import { makeUser } from "./entities/user";
import { makeOrganization } from "./entities/organization";

const repeater = <
	cb extends AnyFunction
>(length: number, callback: cb) =>
		Promise.all<Awaited<ReturnType<cb>>>(
			Array.from({ length }).map(callback)
		);

// USERS
if (process.argv.includes("--user")) {
	await repeater(35, makeUser);
}

// ORGANIZATION
if (process.argv.includes("--organization")) {
	await repeater(15, makeUser)
		.then(users => 
			Promise.all(users.map(({ id }) => makeOrganization(id)))
		);
}

// // CATEGORIES
// const categories = await makeCategories(10);
// const parentCategories = await makeParentCategories(5);

// for (const category of categories) {
// 	const parentCategory = parentCategories[Math.floor(Math.random() * parentCategories.length)];

// 	await assignParentCategoryToCategory(parentCategory.id, category.id);
// }

// // PRODUCTS
// const products = await makeProducts(50);

// for (const product of products) {
// 	const category = categories[Math.floor(Math.random() * categories.length)];

// 	await assignProductToCategory(product.id, category.id);
// }
