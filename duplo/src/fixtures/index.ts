import { AnyFunction } from "@duplojs/duplojs";
import { makeUser } from "./entities/user";
import { makeOrganization } from "./entities/organization";
import { makeCategory } from "./entities/category";
import { makeCategoryToParentCategory } from "./entities/category_to_parent_category";
import { makeProductSheet } from "./entities/product_sheet";
import { makeProductSheetToCategory } from "./entities/product_sheet_to_category";
import { makeParentCategory } from "./entities/parent_category";
import { makeUserToOrganization } from "./entities/user_to_organization";
import { makeImageProductSheet } from "./entities/image_product_sheet";
import { makeWarehouse } from "./entities/warehouse";
import { makeProduct } from "./entities/product";

const repeater = <cb extends AnyFunction>(length: number, callback: cb) =>
	Promise.all<Awaited<ReturnType<cb>>>(Array.from({ length }).map(callback));

// USERS
if (process.argv.includes("--user")) {
	await repeater(35, makeUser);
}

// ORGANIZATION
const createUsersAndOrganizations = async () => {
	const users = await repeater(15, makeUser);
	const organizations = await Promise.all(users.map(({ id }) => makeOrganization(id)));
	return { organizations, users };
};

// USER IN ORGANIZATION
const createUserInOrganization = async (organizationId: string) => {
	const users = await repeater(15, makeUser);
	await Promise.all(users.map(({ id }) => makeUserToOrganization(id, organizationId)));
};

if (process.argv.includes("--organization")) {
	await createUsersAndOrganizations();
}

// CATEGORY
if (process.argv.includes("--category")) {
	const categories = await repeater(10, makeCategory);

	if (process.argv.includes("--with-parent")) {
		const parentCategories = await repeater(5, makeParentCategory);
		await Promise.all(categories.map(category => makeCategoryToParentCategory(
			category.name, parentCategories[Math.floor(Math.random() * parentCategories.length)].name
		)));
	}

	if (process.argv.includes("--with-product-sheet")) {
		const { organizations } = await createUsersAndOrganizations();
		const productSheets = await Promise.all(
			organizations.map(org => repeater(10, () => makeProductSheet(org.id)))
		).then(results => results.flat());
		
		await Promise.all(productSheets.map(
			productSheet => makeProductSheetToCategory(
				productSheet.id, categories[Math.floor(Math.random() * categories.length)].name
			)
		));
		if (process.argv.includes("--with-images")) {
			await Promise.all(productSheets.map(
				productSheet => makeImageProductSheet(productSheet)
			));
		}
		if (process.argv.includes("--with-user-in-org")) {
			await Promise.all(organizations.map(
				organization => createUserInOrganization(organization.id)
			));
		}
		if (process.argv.includes("--with-product")) {
			await Promise.all(
				organizations.map(org => repeater(10, () => makeWarehouse(org.id)))
			).then(results => results.flat());

			await Promise.all(
				productSheets.map(productSheet => repeater(10, () => makeProduct(productSheet)))
			).then(results => results.flat());
		}
	}
}
