import { MockFetch } from "@test/mocks/fetch";
import { PostService } from "./post";

describe("post service", () => {
	beforeAll(() => {
		MockFetch.start();
	});

	afterAll(() => {
		MockFetch.clearRequests();
		MockFetch.stop();
	});

	it("get adresses use good url", async () => {
		const mockedResponse = vi.fn(() => ({ json: async() => ({ features: {} }) }));
		MockFetch.addResponse(/.*/, mockedResponse);

		await PostService.getAddresses("test");

		expect(mockedResponse).lastCalledWith("https://api-adresse.data.gouv.fr/search/?q=test");
	});

	it("valid check adress", async () => {
		const spy = vi.spyOn(PostService, "getAddresses");
		spy.mockReturnValue(Promise.resolve([{ properties: { label: "test" } }]));

		const result = await PostService.checkAddress("test");

		expect(result).toBe(true);
		expect(spy).lastCalledWith("test");
	});

	it("invalid check adress", async () => {
		const spy = vi.spyOn(PostService, "getAddresses");
		spy.mockReturnValue(Promise.resolve([{ properties: { label: "tata" } }]));

		const result = await PostService.checkAddress("test");
		
		expect(result).toBe(false);
		expect(spy).lastCalledWith("test");
	});
});
