import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";

export const [createMenuSurfaceContext, getMenuSurfaceContext] =
	createContextWritableStore<MenuSurfaceContext>();

export interface MenuSurfaceContext {
	open: boolean;
}
