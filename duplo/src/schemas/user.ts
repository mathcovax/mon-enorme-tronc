export const userSchema = zod.object({
	id: zod.string(),
	email: zod.string(),
	lastname: zod.string(),
	firstname: zod.string(),
	dateOfBirth: zod.coerce.string(),
	address: zod.string(),
	primordialRole: zod.string(),
});
