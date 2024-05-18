import { AnyFunction } from "@duplojs/duplojs";
import { makeUser } from "./entities/user";
import { makeOrganization } from "./entities/organization";
import { makeCategory } from "./entities/category";
import { makeCategoryToParentCategory } from "./entities/category_to_parent_category";
import { makeProductSheet } from "./entities/product_sheet";
import { makeProductSheetToCategory } from "./entities/product_sheet_to_category";
import { makeParentCategory } from "./entities/parent_category";

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
	await repeater(5, makeParentCategory);
}

// FUNCTION TO CREATE USERS, ORGANIZATIONS, PRODUCT SHEETS, AND CATEGORIES
const createUsersAndOrganizations = async () => {
	const users = await repeater(15, makeUser);
	const organizations = await Promise.all(users.map(({ id }) => makeOrganization(id)));
	return organizations;
};

// PRODUCT_SHEET
if (process.argv.includes("--product-sheet")) {
	await createUsersAndOrganizations()
		.then((organizations) => organizations.map(({ id }) => makeProductSheet(id)))
		.then((arr) => Promise.all(arr));
}

// PRODUCT_SHEET_TO_CATEGORY
if (process.argv.includes("--with-product")) {
	const createProductSheetToCategory = async () => {
		const organizations = await createUsersAndOrganizations();
		const productSheets = await Promise.all(
			organizations.map(org => repeater(10, () => makeProductSheet(org.id)))
		).then(results => results.flat());
		const categories = await repeater(10, makeCategory);

		await Promise.all(productSheets.map(
			productSheet => makeProductSheetToCategory(
				productSheet.id, categories[Math.floor(Math.random() * categories.length)].id
			)
		));
	};
	await createProductSheetToCategory();
}

// ALL
if (process.argv.includes("--all")) {
	const createAll = async () => {
		const organizations = await createUsersAndOrganizations();
		const productSheets = await Promise.all(
			organizations.map(org => repeater(10, () => makeProductSheet(org.id)))
		).then(results => results.flat());
		
		const categories = await repeater(10, makeCategory);
		const parentCategories = await repeater(5, makeParentCategory);

		await Promise.all([	
			...categories.map(category => makeCategoryToParentCategory(
				category.id, parentCategories[Math.floor(Math.random() * parentCategories.length)].id
			)),
			...productSheets.map(productSheet => makeProductSheetToCategory(
				productSheet.id, categories[Math.floor(Math.random() * categories.length)].id
			)),
		]);
	};

	await createAll();
}
// @mathcovax - I have a question about the following code:
/*
// ORGANIZATION (Separate section if needed)
if (process.argv.includes("--organization")) {
	await createUsersAndOrganizations();
}
*/
