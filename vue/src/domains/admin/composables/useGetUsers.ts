import type { PrimordialRole, User } from "@/lib/utils";

export function useGetUsers(){
	const users = ref<User[]>([]);

	function getUsers(page: number, email: string, primordialRole: PrimordialRole | undefined){
		return duploTo.enriched
			.get(
				"/users",
				{ query: { page, email, primordialRole } }
			)
			.info("users", (data) => {
				users.value = data;
			})
			.result;
	}

	return {
		users,
		getUsers
	};
}
