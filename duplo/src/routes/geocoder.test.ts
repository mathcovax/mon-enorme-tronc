import { PostService } from "@services/post";
import { duploTesting } from "@test/setup";
import { GET } from "./geocoder";

vi.mock("@services/post");

describe("GET /geocoder", () => {
	it("get address list", async () => {
		vi.mocked(PostService.getAddresses).mockReturnValue(Promise.resolve([{ properties: { label: "test" } }]));

		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.setRequestProperties({ query: { address: "test" } })
			.launch();

		expect(res.body).toStrictEqual(["test"]);
	});

	it("get empty address list", async () => {
		const res = await duploTesting
			.testRoute(GET("GET", ""))
			.launch();

		expect(res.body).toStrictEqual([]);
	});
});
