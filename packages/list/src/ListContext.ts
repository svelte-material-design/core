import { ItemContext } from "./item";
import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../packages/common";
import { SelectionType } from "../../../packages/common/hoc";
import { ListRole } from "./types";
import { GroupBinding } from "../../common/selectable";

const [createListContext, getListContext] = createContextBuilder<ListContext>();
export { createListContext, getListContext };

export const [
	setCreateMDCListInstance,
	getCreateMDCListInstance,
] = createContextPropBuilder<boolean>();

export interface ListContext {
	dom: HTMLDivElement | HTMLUListElement;
	role: ListRole | "listbox";
	group: GroupBinding;
	isNav: boolean;
	selectionType: SelectionType;
	registerItem(item: ItemContext): void;
	unregisterItem(item: ItemContext): void;
	reinitialize(): void;
}
