import { MockEnv } from "@test/mocks/env";
import { AccessToken } from "./token";

describe("token service", () => {
	beforeEach(() => {
		MockEnv.resest();
	});
	
	it("generate access token", () => {
		const token = AccessToken.generate({ email: "...", id: "...", primordialRole: "CUSTOMER" });

		expect(token.split(".")[0]).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
	});

	it("check valid access token", () => {
		const token = AccessToken.generate({ email: "...", id: "...", primordialRole: "CUSTOMER" });
		const content = AccessToken.check(token);

		expect(content).toStrictEqual({ email: "...", id: "...", primordialRole: "CUSTOMER" });
	});

	it("check expire access token", () => {
		MockEnv.set("JWT_TIME", "0h");

		const token = AccessToken.generate({ email: "...", id: "...", primordialRole: "CUSTOMER" });
		const content = AccessToken.check(token);

		expect(content).toBe(null);
	});

	it("check invalid access token", () => {

		//@ts-expect-error args error.
		const token = AccessToken.generate("");
		const content = AccessToken.check(token);

		expect(content).toBe(null);
	});
});
