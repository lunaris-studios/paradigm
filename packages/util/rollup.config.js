import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
	input: ["src/index.ts"],
	output: [
		{
			file: pkg.main,
			format: "cjs",
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: "es",
			sourcemap: true,
		},
	],
	external: [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		typescript({
			// Always use locally installed version of `typescript`
			typescript: require("typescript"),
		}),
		alias({
			entries: [{ find: "~/*", replacement: "src/*" }],
		}),
	],
};
