import { promiseWithResolvers, type User } from "@/lib/utils";
import { defineStore } from "pinia";

const KEY_ACCESS_TOKEN_LOCAL_STORAGE = "access-token";

export const useUserStore = defineStore(
	"user",
	() => {
		const user = ref<null | User>(null);
		const accessToken = ref<null | string>(localStorage.getItem(KEY_ACCESS_TOKEN_LOCAL_STORAGE));
		const isConnected = computed(() => !!accessToken);

		let promiseFetching: null | Promise<void> = null;
		const getPromiseFetching = () => promiseFetching;

		function fetchUserValue() {
			const { promise, resolve, reject } = promiseWithResolvers();
			promiseFetching = promise;

			duploTo.enriched
				.get("/user", undefined, { disabledToast: true })
				.info("user", (data) => {
					user.value = data;
					resolve();
				})
				.info("user.notfound", () => {
					setAccessToken(null);
					window.location.reload();
				})
				.e(() => {
					reject();
					promiseFetching = null;
				});
		}

		function setAccessToken(newAccessToken: string | null) {
			if (newAccessToken) {
				localStorage.setItem(
					KEY_ACCESS_TOKEN_LOCAL_STORAGE,
					accessToken.value = newAccessToken
				);
			}
			else {
				localStorage.removeItem(KEY_ACCESS_TOKEN_LOCAL_STORAGE);
			}
		}

		if (accessToken.value !== null) {
			setTimeout(fetchUserValue);
		}

		return {
			getPromiseFetching,
			setAccessToken,
			fetchUserValue,
			user,
			accessToken,
			isConnected
		};
	}
);
