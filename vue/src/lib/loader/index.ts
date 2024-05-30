import { useLoader } from "@/components/loader/useLoader";

export interface LoaderItem {
	id: number
	close(): void
}
let loaderCount = 0;
const { showLoader } = useLoader();
const loaderQueue: LoaderItem[] = [];

export function loaderPush() {
	const loaderItem: LoaderItem = {
		id: loaderCount += 1,
		close: () => loaderClose(loaderItem.id)
	};
	loaderQueue.push(loaderItem);
	setTimeout(
		() => {
			if (
				showLoader.value === false && 
				loaderQueue.find(li => li === loaderItem)
			) {
				showLoader.value = true;
			}
		}, 
		200
	);

	return loaderItem;
}

export function loaderClose(id: number) {
	const loaderItemIndex = loaderQueue.findIndex(li => li.id === id);

	if (loaderItemIndex === -1) {
		throw new Error(`LoaderItem Notfound : ${id}`);
	}

	loaderQueue.splice(loaderItemIndex, 1);

	if (showLoader.value && loaderQueue.length === 0) {
		setTimeout(
			() => {
				if (
					showLoader.value && 
					loaderQueue.length === 0
				) {
					showLoader.value = false;
				}
			}, 
			200
		);
	}
}
