import alias from "@rollup/plugin-alias";
import ttypescript from "ttypescript";
import tsPlugin from "rollup-plugin-typescript2";

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
		tsPlugin({
			clean: true,
			typescript: ttypescript,
			tsconfigDefaults: {
				compilerOptions: {
					plugins: [
						{ transform: "@zerollup/ts-transform-paths" },
						{ transform: "@zerollup/ts-transform-paths", afterDeclarations: true },
					],
				},
			},
		}),
		alias({
			entries: [{ find: "~/*", replacement: "src/*" }],
		}),
	],
};
