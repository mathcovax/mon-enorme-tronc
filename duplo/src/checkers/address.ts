import { PostService } from "@services/post";

export const addressValidCheck = duplo
	.createChecker("addressValid")
	.handler(async (address: string, output) => {
		const isAdressValid = await PostService.checkAddress(address);

		if (isAdressValid) {
			return output("address.valid", isAdressValid);
		} else {
			return output("address.invalid", !isAdressValid);
		}
	})
	.build();
