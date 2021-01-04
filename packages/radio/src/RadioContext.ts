import { createContext } from "@raythurnevoid/svelte-context-enhanced";

export interface RadioContext {
	value: any;
	setSelected(selected: boolean);
}

export const [
	setCreateRadioMDCIstance,
	getCreateRadioMDCIstance,
] = createContext<boolean>();
