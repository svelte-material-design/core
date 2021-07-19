import { createContextWritableStore } from "@raythurnevoid/svelte-context-enhanced";
import type { TabIndicatorTransition } from "../../tab-indicator";
import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";

export const [setTabBarContext, getTabBarContext] =
	createContextWritableStore<TabBarContext>();

export interface TabBarContext {
	transition: TabIndicatorTransition;
	group: SelectionGroupBinding;
	setActive: (TabContext) => void;
	reinitialize: () => void;
}

export const [setTabContext, getTabContext] =
	createContextWritableStore<TabContext>();

export interface TabContext {
	value: string;
	selected: boolean;
}
