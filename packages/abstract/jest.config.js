module.exports = {
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
	moduleNameMapper: {
		".+\\.((s)css|less)$": "<rootDir>/mocks/style-mock.js",
		".+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/mocks/file-transformer.js",
		"^~/(.*)$": "<rootDir>/src/$1",
		"^lodash-es$": "lodash"
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	testPathIgnorePatterns: ["node_modules", ".cache"],
	setupFilesAfterEnv: [
		"@testing-library/jest-dom/extend-expect",
		"@testing-library/jest-dom",
		"@testing-library/react",
		"jest-extended",
	],
};