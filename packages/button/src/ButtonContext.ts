import { createContext } from "@raythurnevoid/svelte-context-enhanced";

const [
	setButtonBehaviour,
	getButtonBehaviour,
] = createContext<ButtonBehaviour>();
export { setButtonBehaviour, getButtonBehaviour };

type ButtonBehaviour = "card:action" | "top-app-bar:action";
