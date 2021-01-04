import { createContext } from "@raythurnevoid/svelte-context-enhanced";

const [setLabelBehaviour, getLabelBehaviour] = createContext<LabelBehaviour>();
export { setLabelBehaviour, getLabelBehaviour };

export type LabelBehaviour = "tab" | "image-list";
