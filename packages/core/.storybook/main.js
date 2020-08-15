// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {
	stories: ["../src/**/*.stories.(mdx|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) =>
				prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
		},
	},
	webpackFinal: async (config) => {
		config.resolve.alias = {
			"~": path.resolve(__dirname, "..", "src"),
		};
		return config;
	},
};
