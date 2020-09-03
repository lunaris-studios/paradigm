module.exports = {
	name: "abstract",
	preset: "../../jest.config.js",
	transform: {
		"^.+\\.[tj]sx?$": [
			"babel-jest",
			{ cwd: __dirname, configFile: "./babel-jest.config.json" },
		],
	},
	moduleNameMapper: {
		"^$abstract/(.*)$": "<rootDir>/src/$1",
		"^lodash-es$": "lodash",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
	coverageDirectory: "../../coverage/libs/abstract",
};
