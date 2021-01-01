import { createContextPropBuilder } from "../../common";

export interface RadioContext {
	value: any;
	setSelected(selected: boolean);
}

export const [
	setCreateRadioMDCIstance,
	getCreateRadioMDCIstance,
] = createContextPropBuilder<boolean>();
