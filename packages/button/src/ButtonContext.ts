import { createContextPropBuilder } from "../../common";

const [
	setButtonBehaviour,
	getButtonBehaviour,
] = createContextPropBuilder<ButtonBehaviour>();
export { setButtonBehaviour, getButtonBehaviour };

type ButtonBehaviour = "card:action" | "top-app-bar:action";
