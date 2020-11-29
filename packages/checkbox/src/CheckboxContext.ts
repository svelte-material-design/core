import { createContextPropBuilder } from "../../../packages/common";

export interface CheckboxContext {
	value: any;
}

const [
	setCheckboxBehaviour,
	getCheckboxBehaviour,
] = createContextPropBuilder<CheckboxBehaviour>();
export { setCheckboxBehaviour, getCheckboxBehaviour };

export type CheckboxBehaviour = "data-table-header" | "data-table-row";

const [
	setCreateCheckboxMDCIstance,
	getCreateCheckboxMDCIstance,
] = createContextPropBuilder<boolean>();
export { setCreateCheckboxMDCIstance, getCreateCheckboxMDCIstance };
