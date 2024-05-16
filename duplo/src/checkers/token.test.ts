import { accessTokenCheck, firebaseTokenCheck } from "./token";
import { MockFirebaseAuth } from "@test/mocks/providers";
import { AccessToken } from "@services/token";
import { duploTesting } from "@test/setup";

vi.mock("@services/token");

describe("token checker", () => {
	it("valide firebase token", async () => {
		MockFirebaseAuth.set("verifyIdToken", () => ({ email: "eee" }));

		const result = await duploTesting.testChecker(firebaseTokenCheck, "");

		expect(result.info).toBe("firebase.token.valid");
	});

	it("invalide firebase token", async () => {
		MockFirebaseAuth.set("verifyIdToken", () => ({}) as never);

		const result = await duploTesting.testChecker(firebaseTokenCheck, "");

		expect(result.info).toBe("firebase.token.invalid");
	});

	it("valide accesToken", async () => {
		vi.mocked(AccessToken.check).mockReturnValue({} as never);

		const result = await duploTesting.testChecker(accessTokenCheck, "");

		expect(result.info).toBe("access.token.valid");
	});

	it("invalide accessToken", async () => {
		vi.mocked(AccessToken.check).mockReturnValue(null);

		const result = await duploTesting.testChecker(accessTokenCheck, "");

		expect(result.info).toBe("access.token.invalid");
	});
});
