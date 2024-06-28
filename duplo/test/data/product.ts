import { product } from "@prisma/client";
import { ProductSchema } from "@schemas/product";

export const productEntityData: product = {
	sku: "la grosse tete de liam euhh enfaite non xD",
	status: "WRONG",
	organizationId: "",
	productSheetId: "",
	createdAt: new Date(),
	updatedAt: new Date(),
};

export const productData: ProductSchema = {
	sku: "la grosse tete de liam euhh enfaite non xD",
	status: "WRONG",
	organizationId: "",
	productSheetId: "",
	createdAt: "",
	updatedAt: "",
	productSheetName: "toto",
	productSheetFirstImageUrl: "/toto",
	warehouseId: "14",
	warehouseName: "la maison du content",
};
