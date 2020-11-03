import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../../packages/common";
import { ListItemDOMElement } from "../";
import { SelectableContext } from "../../../../packages/common/hoc";

const [createItemContext, getItemContext] = createContextBuilder<ItemContext>();
export { createItemContext, getItemContext };

export interface ItemContext extends SelectableContext {
	dom: ListItemDOMElement;
	sendOnSelected(): void;
}

export const [
	setIsSelectionGroup,
	getIsSelectionGroup,
] = createContextPropBuilder<boolean>();
