import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript2";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";

import pkg from "./package.json";

export default {
	input: ["src/index.ts"],
	output: [
		{
			file: pkg.main,
			format: "cjs",
		},
		{
			file: pkg.module,
			format: "es",
		},
	],
	external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
	plugins: [
		typescript({
			clean: true,
			typescript: require("ttypescript"),
			tsconfigDefaults: {
				compilerOptions: {
					plugins: [
						{ transform: "typescript-transform-paths" },
						{ transform: "typescript-transform-paths", afterDeclarations: true },
					],
				},
			},
		}),
		alias({
			entries: [{ find: "~/*", replacement: "src/*" }],
		}),
		url({
			include: ["**/*.png", "**/*.jpg", "**/*.gif", "**/*.otf"],
		}),
		svgr()
	],
};
