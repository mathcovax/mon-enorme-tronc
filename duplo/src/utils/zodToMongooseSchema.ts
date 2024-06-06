import { zodSchema as ZTMS } from "@zodyac/zod-mongoose";
import type { Schema } from "mongoose";

export function zodToMongooseSchema<
	Z extends object
>(zodSchema: Zod.ZodType<Z>): Schema<Z>
{
	//@ts-expect-error infinite error de merde.
	return ZTMS(zodSchema);
}
