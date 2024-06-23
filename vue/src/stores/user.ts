import { promiseWithResolvers, type SelfUser, type PrimordialRole } from "@/lib/utils";
import { defineStore } from "pinia";

const KEY_ACCESS_TOKEN_LOCAL_STORAGE = "access-token";

const primordialRolesHierarchy: Record<PrimordialRole, PrimordialRole[]> = {
	CUSTOMER: [],
	MODERATOR: ["CUSTOMER"],
	CONTENTS_MASTER: ["CUSTOMER"],
	ADMIN: ["CONTENTS_MASTER", "MODERATOR", "CUSTOMER"],
};

export const useUserStore = defineStore(
	"user",
	() => {
		const user = ref<null | SelfUser>(null);
		const accessToken = ref<null | string>(localStorage.getItem(KEY_ACCESS_TOKEN_LOCAL_STORAGE));
		const isConnected = computed(() => !!accessToken.value);

		let promiseFetching: null | Promise<SelfUser> = null;
		const getPromiseFetching = () => promiseFetching;

		function fetchUserValue() {
			const { promise, resolve, reject } = promiseWithResolvers<SelfUser>();
			promiseFetching = promise;

			duploTo.enriched
				.get("/user", undefined, { disabledToast: true })
				.info("user", (data) => {
					user.value = data;
					resolve(data);
				})
				.info("user.notfound", () => {
					removeAccessToken();
				})
				.info("access.token.invalid", () => {
					setAccessToken(null);
				})
				.e(() => {
					reject();
				});
		}

		function hasPrimordialRole(wantedPrimordialRole: PrimordialRole) {
			const userPrimordialRole = user.value?.primordialRole;

			if (!userPrimordialRole) {
				return false;
			}

			if (
				userPrimordialRole !== wantedPrimordialRole &&
				!primordialRolesHierarchy[userPrimordialRole].includes(wantedPrimordialRole)
			) {
				return false;
			}

			return true;
		}

		function setAccessToken(newAccessToken: string | null) {
			if (newAccessToken) {
				localStorage.setItem(
					KEY_ACCESS_TOKEN_LOCAL_STORAGE,
					accessToken.value = newAccessToken
				);
			}
			else {
				accessToken.value = null;
				localStorage.removeItem(KEY_ACCESS_TOKEN_LOCAL_STORAGE);
			}
		}

		function removeAccessToken() {
			setAccessToken(null);
			window.location.reload();
		}

		if (accessToken.value !== null) {
			setTimeout(fetchUserValue);
		}

		return {
			getPromiseFetching,
			hasPrimordialRole,
			setAccessToken,
			removeAccessToken,
			fetchUserValue,
			user,
			accessToken,
			isConnected
		};
	}
);
