import { fullProductSheetSchema } from "@schemas/fullProductSheet";
import { productStatusChangeSchema } from "@schemas/productStatusChange";
import { zodToMongooseSchema } from "@utils/zodToMongooseSchema";
import { model } from "mongoose";

const fullProductSheetMongooseSchema = zodToMongooseSchema(fullProductSheetSchema);
export const fullProductSheetModel = model(
	"FullProductSheet",
	fullProductSheetMongooseSchema.index({ 
		name: "text", 
		shortDescription: "text",
		description: "text",
	})
);

const productStatusChangeMongooseSchema = zodToMongooseSchema(productStatusChangeSchema);
export const productStatusChangeModel = model(
	"productStatusChange",
	productStatusChangeMongooseSchema
);
