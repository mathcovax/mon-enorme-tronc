import { MockPrisma } from "@test/mocks/providers";
import { POST } from "./login";
import { duploTesting } from "@test/setup";

describe("POST /login", () => {
	beforeEach(() => {
		MockPrisma.resest();
	});

	it("user login", async () => {
		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({ body: "test" })
			.mockChecker(
				"firebaseToken", 
				{ info: "firebase.token.valide", data: { email: "test" } },
				{ passCatch: true }
			)
			.mockChecker(
				"userExist",
				{ info: "", data: { email: "test", id: "1234" } },
				{ passCatch: true }
			)
			.launch();

		expect(res.information).toBe("user.login");
	});

	it("user register", async () => {
		MockPrisma.set("user", "create", () => ({ email: "test", id: "1234" }));

		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({ body: "test" })
			.mockChecker(
				"firebaseToken", 
				{ info: "firebase.token.valide", data: { email: "test" } }
			)
			.mockChecker(
				"userExist",
				{ info: "", data: null }
			)
			.launch();

		expect(res.information).toBe("user.register");
	});
});
