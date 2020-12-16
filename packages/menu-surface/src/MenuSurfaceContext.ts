import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../packages/common";

export const [
	createMenuSurfaceContext,
	getMenuSurfaceContext,
] = createContextBuilder<MenuSurfaceContext>();

export interface MenuSurfaceContext {
	open: boolean;
}
