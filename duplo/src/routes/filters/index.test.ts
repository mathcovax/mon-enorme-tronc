import { duploTesting } from "@test/setup";
import { GET } from "./index";

describe("/filters", () => {
	describe("GET", () => {
		it("get filters", async () => {
			const res = await duploTesting
				.testRoute(GET("GET", "/filters"))
				.launch();
			console.log(res.body);
			expect(res.information).toBe("filters.found");
		});
	});
});
