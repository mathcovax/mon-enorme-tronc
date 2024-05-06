interface Address {
	properties: {
		"label": string
	}
}

export class PostService {
	static getAddresses(address: string): Promise<Address[]> {
		return fetch(ENV.GOUV_SEARCH_ADDRESS_URL + `?q=${address}`)
			.then(res => res.json())
			.then(data => data.features);
	}

	static async checkAddress(address: string): Promise<boolean> {
		return this.getAddresses(address)
			.then(findedAddresses => findedAddresses.find(addr => addr.properties.label === address) !== undefined);
	}
}
