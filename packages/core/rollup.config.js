import alias from "@rollup/plugin-alias";
import analyzer from "rollup-plugin-analyzer";
import auto from "@rollup/plugin-auto-install";
import cleaner from "rollup-plugin-cleaner";
import commonjs from "@rollup/plugin-commonjs";
import gzip from "rollup-plugin-gzip";
import image from "@rollup/plugin-image";
import resolve from "@rollup/plugin-node-resolve";
import strip from "@rollup/plugin-strip";
import tsPlugin from "rollup-plugin-typescript2";
import ttypescript from "ttypescript";
import visualizer from "rollup-plugin-visualizer";

import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const isProduction = Boolean(
	typeof process !== "undefined" && process.env && process.env.NODE_ENV === "production",
);

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
		auto(),
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
		resolve(),
		commonjs(),
		image(),
		cleaner({
			targets: pkg.files,
		}),
		analyzer({ summaryOnly: true }),
		visualizer({ filename: "./dist/bundle.html", sourcemap: true, gzipSize: true }),
		...(isProduction ? [gzip(), strip(), terser()] : []),
	],
};
