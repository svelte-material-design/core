import { createContextBuilder, createContextPropBuilder } from "../../common";

export const [
	createMenuSurfaceContext,
	getMenuSurfaceContext,
] = createContextBuilder<MenuSurfaceContext>();

export interface MenuSurfaceContext {
	open: boolean;
}
