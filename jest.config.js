module.exports = {
	testMatch: ["**/+(*.)+(test).+(ts|js)?(x)"],
	transform: {
		"^.+\\.(ts|js|html)$": "ts-jest",
	},
	moduleNameMapper: {},
	resolver: "@nrwl/jest/plugins/resolver",
	moduleFileExtensions: ["ts", "js", "html"],
	coverageReporters: ["html"],
};
