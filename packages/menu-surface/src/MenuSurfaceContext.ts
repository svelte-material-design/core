import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../packages/common";

const [createMenuSurfaceContext, getMenuSurfaceContext] = createContextBuilder<
	MenuSurfaceContext
>();
export { createMenuSurfaceContext, getMenuSurfaceContext };

export const [
	setCreateMDCMenuSurfaceInstance,
	getCreateMDCMenuSurfaceInstance,
] = createContextPropBuilder<boolean>();

export interface MenuSurfaceContext {
	open: boolean;
}
