import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";

export const [
	createMenuSurfaceContext,
	getMenuSurfaceContext,
] = createContextStore<MenuSurfaceContext>();

export interface MenuSurfaceContext {
	open: boolean;
}
