import { ListItemDOMElement } from "../types";

export interface OnItemSelectedEvent {
	dom: ListItemDOMElement;
	selected: boolean;
}
