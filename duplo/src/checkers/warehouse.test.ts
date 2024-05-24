import { duploTesting } from "@test/setup";
import { MockPrisma } from "@test/mocks/providers";
import { inputWarehouse, warehouseExistCheck } from "./warehouse";

describe("warehouse checker", () => {
	beforeEach(() => {
		MockPrisma.reset();
	});

	it("find by name", async () => {
		const warehouse= {};
		const spy = vi.fn(async () => warehouse);
		MockPrisma.set("warehouse", "findFirst", spy);

		const res = await duploTesting
			.testChecker(warehouseExistCheck, inputWarehouse.name("test"));

		expect(spy).lastCalledWith({
			where: { name: "test" }
		});
		expect(res.info).toBe("warehouse.exist");
	});

	it("find by id", async () => {
		const warehouse = {};
		const spy = vi.fn(async () => warehouse);
		MockPrisma.set("warehouse", "findFirst", spy);

		const res = await duploTesting
			.testChecker(warehouseExistCheck, inputWarehouse.id("1234"));

		expect(spy).lastCalledWith({
			where: { id: "1234" }
		});
		expect(res.info).toBe("warehouse.exist");
	});

	it("notfound", async () => {
		MockPrisma.set("warehouse", "findFirst", () => null);
		const res = await duploTesting
			.testChecker(warehouseExistCheck, inputWarehouse.id("143535"));

		expect(res.info).toBe("warehouse.notfound");
	});
});
