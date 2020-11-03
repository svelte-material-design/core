import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../packages/common";

const [createMenuContext, getMenuContext] = createContextBuilder<MenuContext>();
export { createMenuContext, getMenuContext };

export interface MenuContext {}

export const [
	setCreateMDCMenuInstance,
	getCreateMDCMenuIstance,
] = createContextPropBuilder<boolean>();
