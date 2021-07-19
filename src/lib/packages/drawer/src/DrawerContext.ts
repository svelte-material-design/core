import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";
import type { DrawerVariant } from "./types";

const [createDrawerContext, getDrawerContext] =
	createContextWritableStore<DrawerContext>();
export { createDrawerContext, getDrawerContext };

export interface DrawerContext {
	variant: DrawerVariant;
}
