#!/usr/bin/env node

//@ts-check
const fs = require("fs").promises;
const path = require("path");

/**
 * Options for the `getFiles()` function.
 * @typedef {Object} Options
 * @property {string[]} ignore - A list of directory names to ignore.
 * @property {string} extension - Only returns files with a matching extension.
 */

/**
 * Recursively iterate over all files in the provided directory
 * tree.
 * (https://gist.github.com/qwtel/fd82ab097cbe1db50ded9505f183ccb8)
 * @param {string} dir - Directory to iterate over
 * @param {Options} options
 */
async function getFiles(dir, options) {
	const { extension, ignore } = options;

	const dirents = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map((dirent) => {
			if (ignore.includes(dirent.name)) {
				return null;
			}

			const res = path.resolve(dir, dirent.name);

			if (dirent.isDirectory()) {
				return getFiles(res, options);
			}
			if (extension && typeof extension === `string`) {
				return path.extname(res).toLowerCase() === `.${extension}` ? res : null;
			}
			return res;
		}),
	);

	return files.flat().filter((path) => path !== null);
}

module.exports = getFiles;
