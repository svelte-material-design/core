import { createContextStore } from "@raythurnevoid/svelte-context-enhanced";
import type { DrawerVariant } from "./types";

const [
	createDrawerContext,
	getDrawerContext,
] = createContextStore<DrawerContext>();
export { createDrawerContext, getDrawerContext };

export interface DrawerContext {
	variant: DrawerVariant;
}
