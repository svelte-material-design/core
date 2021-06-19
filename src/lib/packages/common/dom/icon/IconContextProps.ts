import { createContext } from "@raythurnevoid/svelte-context-enhanced";

const [setIconBehaviour, getIconBehaviour] = createContext<IconBehaviour>();
export { setIconBehaviour, getIconBehaviour };

type IconBehaviour = "fab" | "tab";
