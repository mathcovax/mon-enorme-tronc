import "@/env";
import { zod } from "@duplojs/duplojs";

//@ts-expect-error var 'global' cause type error.
global.zod = zod;
