import { createContextBuilder, createContextPropBuilder } from "../../common";

const [
	setIconButtonBehaviour,
	getIconButtonBehaviour,
] = createContextPropBuilder<IconButtonBehaviour>();
export { setIconButtonBehaviour, getIconButtonBehaviour };

type IconButtonBehaviour =
	| "card:action"
	| "top-app-bar:navigation"
	| "top-app-bar:action";

export const [
	setIconButtonToggleContext,
	getIconButtonToggleContext,
] = createContextBuilder<IconButtonToggle>();

export interface IconButtonToggle {
	active: boolean;
}
