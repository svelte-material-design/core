import { createContext } from "@raythurnevoid/svelte-context-enhanced";

export const [setActionType, getActionType] =
	createContext<"icon" | "button">();
