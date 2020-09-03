module.exports = {
	name: "borders",
	preset: "../../jest.config.js",
	transform: {
		"^.+\\.[tj]sx?$": [
			"babel-jest",
			{ cwd: __dirname, configFile: "./babel-jest.config.json" },
		],
	},
	moduleNameMapper: {
		"^$borders/(.*)$": "<rootDir>/src/$1",
		"^lodash-es$": "lodash",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
	coverageDirectory: "../../coverage/libs/borders",
};
