import preprocess from "svelte-preprocess";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

const scssIncludePaths = [
	resolve(__dirname, "src/lib"),
	resolve(__dirname, "node_modules"),
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			includePaths: scssIncludePaths,
		},
	}),
};

export default config;
