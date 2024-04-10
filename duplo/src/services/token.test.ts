import { MockEnv } from "@test/mocks/env";
import { AccessToken } from "./token";

describe("token service", () => {
	beforeEach(() => {
		MockEnv.resest();
	});
	
	it("generate asccess token", () => {
		const token = AccessToken.generate({email: "...", id: "..."});

		expect(token.split(".")[0]).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
	});

	it("check valid asccess token", () => {
		const token = AccessToken.generate({email: "...", id: "..."});
		const content = AccessToken.check(token);

		expect(content).toStrictEqual({email: "...", id: "..."});
	});

	it("check expire asccess token", () => {
		MockEnv.set("JWT_TIME", "0h");

		const token = AccessToken.generate({email: "...", id: "..."});
		const content = AccessToken.check(token);

		expect(content).toBe(null);
	});

	it("check invalid asccess token", () => {

		//@ts-expect-error args error.
		const token = AccessToken.generate("");
		const content = AccessToken.check(token);

		expect(content).toBe(null);
	});
});
