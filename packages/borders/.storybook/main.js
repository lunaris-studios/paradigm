const path = require("path");

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
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
			...config.resolve.alias,
			"~": path.resolve(__dirname, "..", "src"),
			// https://github.com/storybookjs/storybook/issues/6204#issuecomment-478992364
			"core-js/modules": path.resolve(
				__dirname,
				"..",
				"node_modules/@storybook/core/node_modules/core-js/modules",
			),
		};
		return config;
	},
};
