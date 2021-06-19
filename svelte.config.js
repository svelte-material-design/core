import preprocess from "svelte-preprocess";
import { resolve } from "path";

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			includePaths: [resolve("src"), resolve("node_modules")],
		},
	}),
};

export default config;
