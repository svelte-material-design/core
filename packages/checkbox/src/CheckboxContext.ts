import { createContext } from "@raythurnevoid/svelte-context-enhanced";

export interface CheckboxContext {
	value: any;
}

const [
	setCheckboxBehaviour,
	getCheckboxBehaviour,
] = createContext<CheckboxBehaviour>();
export { setCheckboxBehaviour, getCheckboxBehaviour };

export type CheckboxBehaviour = "data-table-header" | "data-table-row";

const [
	setCreateCheckboxMDCIstance,
	getCreateCheckboxMDCIstance,
] = createContext<boolean>();
export { setCreateCheckboxMDCIstance, getCreateCheckboxMDCIstance };
