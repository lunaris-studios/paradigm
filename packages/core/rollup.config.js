import alias from "@rollup/plugin-alias";
import cleaner from "rollup-plugin-cleaner";
import tsPlugin from "rollup-plugin-typescript2";
import ttypescript from "ttypescript";

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
		cleaner({
			targets: pkg.files,
		}),
		alias({
			entries: [{ find: "~/*", replacement: "src/*" }],
		}),
	],
};
