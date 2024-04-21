import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		watch: false,
		include: ["src/**/*.test.ts"],
		globals: true,
		setupFiles: "test/setup.ts",
		coverage: {
			provider: "istanbul",
			reporter: [
				"text", "json", "html", "json-summary"
			],
			reportsDirectory: "coverage",
			exclude: [
				"test/**", "src/*.ts", "src/providers/**", "src/prisma/**"
			],
			thresholds: {
				lines: 80,
				functions: 80,
				statements: 80,
				branches: 50,
			}
		},
	},
	cacheDir: "../node_modules/.vite/vitest"
});
