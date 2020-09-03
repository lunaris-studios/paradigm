const rollup = require("rollup");
const rpt2 = require("rollup-plugin-typescript2");
const getNxRollupConfig = require("@nrwl/react/plugins/bundle-rollup");
const { createBuilder } = require("@angular-devkit/architect");
// const buildableLibsUtil = require("@nrwl/workspace/src/utils/buildable-libs-utils");

function getRollupOptions(rollupConfig, options) {
	const nxRollup = getNxRollupConfig(rollupConfig);

	// const compilerOptionPaths = buildableLibsUtil.computeCompilerOptionsPaths(
	// 	options.tsConfig,
	// 	dependencies,
	// );
	const rpt2Index = nxRollup.plugins.findIndex((plugin) => plugin.name === "rpt2");
	const rpt2Impl = nxRollup.plugins[rpt2Index];
	// const rpt2Options = rpt2Impl.options(rollupConfig);


	// const foo = rpt2();

	// nxRollup.plugins[rpt2Index] = rpt2({
	// 	check: true,
	// 	// typescript: ttypescript,
	// 	tsconfig: options.tsConfig,
	// 	tsconfigOverride: {
	// 		compilerOptions: {
	// 			rootDir: options.entryRoot,
	// 			allowJs: false,
	// 			declaration: true,
	// 			target: rollupConfig.output.format === "esm" ? "esnext" : "es5",
	// 			paths: {
	// 				"$abstract/*": ["libs/abstract/src/*"],
	// 				"$protocol/*": ["libs/protocol/src/*"],
	// 				"$util/*": ["libs/util/src/*"],
	// 			},
	// 			plugins: [
	// 				{ transform: "@zerollup/ts-transform-paths" },
	// 				{ transform: "@zerollup/ts-transform-paths", afterDeclarations: true },
	// 			],
	// 		},
	// 	},
	// });

	// options.plugins[options.plugins.findIndex((plugin) => plugin.name === "rpt2")] = rpt2({
	// 	check: true,
	// 	typescript: ttypescript,
	// 	tsconfigOverride: {
	// 		compilerOptions: {
	// 			rootDir: options.entryRoot,
	// 			allowJs: false,
	// 			declaration: true,
	// 			paths: compilerOptionPaths,
	// 			target: config.format === "esm" ? "esnext" : "es5",
	// 			plugins: [
	// 				{ transform: "@zerollup/ts-transform-paths" },
	// 				{ transform: "@zerollup/ts-transform-paths", afterDeclarations: true },
	// 			],
	// 		},
	// 	},
	// });

	return nxRollup;
}

module.exports = getRollupOptions;
