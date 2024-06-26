declare global {
	const MetConfig: typeof import("./MetConfig")["MetConfig"];
}

export const MetConfig = {
	Cart: {
		articlesLimit: 10,
		quantityLimit: 15,
	},
	navigationBar: {
		itemsLimit: 10
	},
	parentCategory: {
		categoriesLimit: 10
	},
	productSheet: {
		imagesLimit: 6,
		categoriesLimit: 5
	},
	stripe: {
		timestampSession: 30*60, // 30 min
	}
};
//@ts-expect-error var 'global' cause type error.
global.MetConfig = MetConfig;
