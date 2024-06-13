import { makeUser } from "./entities/user";
import { addUserToOrganization, makeOrganization, organizationRolesTuple } from "./entities/organization";
import { addProductSheetToCategory, makeCategory } from "./entities/category";
import { makeProductSheet } from "./entities/product_sheet";
import { addCategoryToParentCategory, makeParentCategory } from "./entities/parent_category";
import { makeImageProductSheet } from "./entities/image_product_sheet";
import { makeWarehouse } from "./entities/warehouse";
import { makeProduct } from "./entities/product";
import categoryData from "./data/category.json";
import productData from "./data/product.json";
import facetsData from "./data/facets.json";
import { facetType, makeFacet } from "./entities/facet";

const repeater = <
	F extends ((index: number) => Promise<unknown>)
>(length: number, callback: F) =>
		Promise.all<Awaited<ReturnType<F>>>(Array.from({ length }).map((value, index) => callback(index) as never));

const mapAsync = <
	A, F extends ((value: A, index: number) => Promise<unknown>)
>(arr: A[], callback: F) => 
		Promise.all<Awaited<ReturnType<F>>>(arr.map((value, index) => callback(value, index) as never));

const getRandomImage = (size = 200) => fetch(`https://picsum.photos/${size}`)
	.then(r => r.arrayBuffer())
	.then(r => Buffer.from(r));


const numberOf = Object.freeze({
	randomImage: 100,
	user: 150,
	organization: 5,
	productSheetRound: 2,
});

const imageBuffers = await repeater(numberOf.randomImage, () => getRandomImage());

const users = await repeater(numberOf.user, () => makeUser());

const organizationOwner = users.splice(0, numberOf.organization);
const organizations = await mapAsync(organizationOwner, ({ id }) => makeOrganization(id));

const warehouses = await mapAsync(
	organizations, 
	({ id }) => repeater(
		Math.floor(Math.random() * 2) + 1,
		() => makeWarehouse(id)
	)
);

for (let index = 0; index <= (organizations.length*organizationRolesTuple.length) - 1; index++) {
	const currentIndexOrganization = Math.floor(index/organizationRolesTuple.length);

	await addUserToOrganization(
		users[index].id, 
		organizations[currentIndexOrganization].id, 
		organizationRolesTuple[index % organizationRolesTuple.length]
	);
}

await mapAsync(
	Object.entries(categoryData),
	async ([parentName, categories]) => {
		await makeParentCategory({ name: parentName });
		await mapAsync(
			categories,
			async (name) => {
				await makeCategory(imageBuffers[Math.floor(Math.random() * imageBuffers.length)], { name });
				await addCategoryToParentCategory(name, parentName);
			}
		);
	}
);

const entries = Object.entries(productData);
for (let round = 0; round < numberOf.productSheetRound; round++) {
	await repeater(
		1000,
		(index) => {
			const [categoryName, product_sheet] = entries[index % entries.length];
			const currentWarehouses = warehouses[index % organizations.length];
			
			return makeProductSheet(
				organizations[index % organizations.length].id,
				{
					name: `${product_sheet} ${round}-${index}` 
				}
			).then((productSheet) => Promise.all([
				addProductSheetToCategory(productSheet.id, categoryName),
				repeater(
					Math.floor(Math.random() * 5) + 1, 
					(ii) => makeImageProductSheet(productSheet, imageBuffers[(index + ii) % imageBuffers.length])
				),
				repeater(
					Math.floor(Math.random() * 500), 
					(index) => makeProduct(productSheet, currentWarehouses[index % currentWarehouses.length])
				),
				mapAsync(
					facetType.slice(
						Math.floor(Math.random() * facetType.length), 
						facetType.length
					),
					(value) => makeFacet(
						productSheet.id, 
						value,
						facetsData[value][index % facetsData[value].length]
					)
				)
			]));
		}
	);
}
