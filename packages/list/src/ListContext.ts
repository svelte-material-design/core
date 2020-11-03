import { ItemContext } from "./item";
import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../packages/common";
import { MDCList } from "@material/list";
import { SelectableGroupContext } from "../../../packages/common/hoc";

const [createListContext, getListContext] = createContextBuilder<ListContext>();
export { createListContext, getListContext };

export const [
	setCreateMDCListInstance,
	getCreateMDCListInstance,
] = createContextPropBuilder<boolean>();

export interface ListContext extends SelectableGroupContext {
	role: ListRole;
	isNav: boolean;
	list: MDCList;
	registerItem(item: ItemContext): void;
	unregisterItem(item: ItemContext): void;
}

export type ListRole = "listbox" | "radiogroup" | "group" | "list" | "menu";
