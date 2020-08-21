#!/usr/bin/env node

//@ts-check
const fs = require("fs");
const path = require("path");

const getFiles = require("./get-files");

const GENERATED_SRC_DIR = path.resolve(process.cwd(), "./src/generated");
const PACKAGE_DIR = path.resolve(__dirname, "../../../packages");

if (!fs.existsSync(GENERATED_SRC_DIR)) {
	fs.mkdirSync(GENERATED_SRC_DIR);
}

/** */

(async () => {
	const files = await getFiles(PACKAGE_DIR, {
		ignore: ["node_modules"],
		extension: "mdx",
	});

	return Promise.all(
		files.map(async (file) => {
			const basename = path.basename(file);
			await fs.promises.copyFile(file, `${GENERATED_SRC_DIR}/${basename}`);
		}),
	);
})();
