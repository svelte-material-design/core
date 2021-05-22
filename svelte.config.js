/** @type {import('svelte-preprocess')["default"]} */
// @ts-ignore
const sveltePreprocess = require("svelte-preprocess");
const path = require("path");

module.exports = {
	preprocess: sveltePreprocess({
		typescript: {
			tsconfigFile: "./tsconfig.json",
		},
		scss: {
			includePaths: [path.resolve("node_modules"), path.resolve("src")],
		},
	}),
	preserveWhitespace: true,
	dev: true,
};
