import { MockPrisma } from "@test/mocks/providers";
import { duploTesting } from "@test/setup";
import { POST } from "./register";

describe("POST /register", () => {
	const spy = vi.fn(() => ({}));
	beforeEach(() => {
		MockPrisma.resest();
		MockPrisma.set("user", "create", spy);
	});

	it("user register", async () => {
		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({
				body: {
					fireBaseIdToken: "test",
					lastname: "Doe",
					firstname: "Jhon",
					age: 20,
					address: "test",
				}
			})
			.mockChecker(
				"firebaseToken",
				{ info: "firebase.token.valid", data: { email: "test" } },
				{passCatch: true}
			)
			.mockChecker(
				"userExist",
				{ info: "user.notfound", data: null },
				{passCatch: true}
			)
			.mockChecker(
				"addressValid",
				{ info: "address.valid", data: true },
				{passCatch: true}
			)
			.launch();

		expect(spy).toBeCalled;
		expect(res.information).toBe("user.registered");
	});

	it("user already exist", async () => {
		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({
				body: {
					fireBaseIdToken: "test",
					lastname: "Doe",
					firstname: "Jhon",
					age: 20,
					address: "test",
				}
			})
			.mockChecker(
				"firebaseToken",
				{ info: "firebase.token.valid", data: { email: "test" } }
			)
			.mockChecker(
				"userExist",
				{
					info: "user.exist",
					data: {
						fireBaseIdToken: "test",
						lastname: "Doe",
						firstname: "Jhon",
						age: 20,
						address: "test",
					}
				}
			)
			.mockChecker(
				"addressValid",
				{ info: "address.valid", data: true }
			)
			.launch();

		expect(spy).not.toBeCalled;
		expect(res.information).toBe("user.alreadyExist");
	});

	it("user has invalid address", async () => {
		const res = await duploTesting
			.testRoute(POST("POST", ""))
			.setDefaultFloorValue({
				body: {
					fireBaseIdToken: "test",
					lastname: "Doe",
					firstname: "Jhon",
					age: 20,
					address: "test",
				}
			})
			.mockChecker(
				"firebaseToken",
				{ info: "firebase.token.valid", data: { email: "test" } }
			)
			.mockChecker(
				"userExist",
				{ info: "user.notfound", data: null }
			)
			.mockChecker(
				"addressValid",
				{ info: "address.invalid", data: false }
			)
			.launch();

		expect(spy).not.toBeCalled;
		expect(res.information).toBe("user.invalid.address");
	});
});
