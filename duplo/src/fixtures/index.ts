import { AnyFunction } from "@duplojs/duplojs";
import { makeUser } from "./entities/user";
import { makeOrganization } from "./entities/organization";
import { makeCategory } from "./entities/category";
import { makeCategoryToParentCategory } from "./entities/category_to_parent_category";
import { makeProductSheet } from "./entities/product_sheet";
import { makeProductSheetToCategory } from "./entities/product_sheet_to_category";

const repeater = <cb extends AnyFunction>(length: number, callback: cb) =>
	Promise.all<Awaited<ReturnType<cb>>>(Array.from({ length }).map(callback));

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

// CATEGORY
if (process.argv.includes("--category")) {
	await repeater(10, makeCategory);
}

// PARENT_CATEGORY
if (process.argv.includes("--parent-category")) {
	await repeater(5, makeCategory);
}

// CATEGORY_TO_PARENT_CATEGORY
if (process.argv.includes("--category-to-parent-category")) {
	const createCategoryToParentCategory = async () => {
		const [categories, parentCategories] = await Promise.all([
			repeater(10, makeCategory),
			repeater(5, makeCategory)
		]);

		await Promise.all(categories.map(
			category => makeCategoryToParentCategory(
				category.id, parentCategories[Math.floor(Math.random() * parentCategories.length)].id
			)
		));
	};

	await createCategoryToParentCategory();
}

// PRODUCT_SHEET
if (process.argv.includes("--product-sheet")) {
	await repeater(5, makeOrganization)
		.then((organizations) => organizations.map(({ id }) => makeProductSheet(id)))
		.then((arr) => Promise.all(arr));
}

// PRODUCT_SHEET_TO_CATEGORY
if (process.argv.includes("--product-sheet-to-category")) {
	const createProductSheetToCategory = async () => {
		const [productSheets, categories] = await Promise.all([
			repeater(50, makeProductSheet),
			repeater(10, makeCategory)
		]);

		await Promise.all(productSheets.map(
			productSheet => makeProductSheetToCategory(
				productSheet.id, categories[Math.floor(Math.random() * categories.length)].id
			)
		));
	};

	await createProductSheetToCategory();
}
