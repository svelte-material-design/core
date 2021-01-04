import {
	createContextStore,
	createContext,
} from "@raythurnevoid/svelte-context-enhanced";

const [
	setIconButtonBehaviour,
	getIconButtonBehaviour,
] = createContext<IconButtonBehaviour>();
export { setIconButtonBehaviour, getIconButtonBehaviour };

type IconButtonBehaviour =
	| "card:action"
	| "top-app-bar:navigation"
	| "top-app-bar:action";

export const [
	setIconButtonToggleContext,
	getIconButtonToggleContext,
] = createContextStore<IconButtonToggle>();

export interface IconButtonToggle {
	active: boolean;
}
