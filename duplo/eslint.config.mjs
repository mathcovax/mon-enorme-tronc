import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	{
		rules: {
			"eol-last": ["error", "always"],
			"semi": ["error", "always"],
			"no-extra-semi": "error",
			"quotes": ["error", "double"],
			"indent": ["error", "tab"],
			"max-len": ["error", { "code": 150 }],
		}
	},
);
