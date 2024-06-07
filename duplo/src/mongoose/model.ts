import { fullProductSheetSchema } from "@schemas/fullProductSheet";
import { zodToMongooseSchema } from "@utils/zodToMongooseSchema";
import { model } from "mongoose";

const fullProductSheetMongooseSchema = zodToMongooseSchema(fullProductSheetSchema);
export const fullProductSheetModel = model(
	"FullProductSheet",
	fullProductSheetMongooseSchema
);
