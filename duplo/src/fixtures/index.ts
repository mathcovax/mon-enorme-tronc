import { makeCategories } from "./entities/category";
import { makeParentCategories, assignParentCategoryToCategory } from "./entities/parent-category";
import { makeProducts, assignProductToCategory } from "./entities/product";
import { makeUsers } from "./entities/user";

// USERS
await makeUsers(1);

// CATEGORIES
const categories = await makeCategories(10);
const parentCategories = await makeParentCategories(5);

for (const category of categories) {
	const parentCategory = parentCategories[Math.floor(Math.random() * parentCategories.length)];

	await assignParentCategoryToCategory(parentCategory.id, category.id);
}

// PRODUCTS
const products = await makeProducts(50);

for (const product of products) {
	const category = categories[Math.floor(Math.random() * categories.length)];

	await assignProductToCategory(product.id, category.id);
}
