interface AdressProperties {
	label: string
}

interface Address {
	properties: AdressProperties
}

export class PostService {
	static baseUrl = "https://api-adresse.data.gouv.fr/search/";

	static getAddresses(address: string): Promise<Address[]> {
		return fetch(`${this.baseUrl}?q=${address}`)
			.then(res => res.json())
			.then(data => data.features);
	}

	static checkAddress(address: string): Promise<boolean> {
		return this.getAddresses(address)
			.then(findedAddresses => !!findedAddresses.find(addr => addr.properties.label === address));
	}
}
