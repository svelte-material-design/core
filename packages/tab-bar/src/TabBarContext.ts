import { createContextBuilder } from "../../../packages/common";
import { TabIndicatorTransition } from "../../../packages/tab-indicator";
import { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/esm/selectable";

export const [
	setTabBarContext,
	getTabBarContext,
] = createContextBuilder<TabBarContext>();

export interface TabBarContext {
	transition: TabIndicatorTransition;
	group: SelectionGroupBinding;
}

export const [
	setTabContext,
	getTabContext,
] = createContextBuilder<TabContext>();

export interface TabContext {
	active: boolean;
}
