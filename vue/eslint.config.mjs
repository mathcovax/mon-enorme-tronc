import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import pluginVue from 'eslint-plugin-vue'

const rules = {
	"eol-last": ["error", "always"],
	"semi": ["error", "always"],
	"no-extra-semi": "error",
	"quotes": ["error", "double"],
	"indent": ["error", "tab"],
	"max-len": ["error", { "code": 120 }],
};

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	{
		files: ["src/**/*.ts"],
		rules
	},
	...pluginVue.configs["flat/strongly-recommended"],
	{
		files: ["src/**/*.vue"],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tseslint.parser,
				sourceType: "module",
			},
		},
		rules: {
			...rules,
		},
	},
);
