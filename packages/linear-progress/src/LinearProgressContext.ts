import { createContext } from "@raythurnevoid/svelte-context-enhanced";

export const [
	setCreateMDCLinearProgressInstance,
	getCreateMDCLinearProgressInstance,
] = createContext<boolean>();
