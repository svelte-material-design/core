import { ItemContext } from "./item";
import {
	createContextBuilder,
	createContextPropBuilder,
} from "../../../packages/common";
import { MDCList } from "@material/list";
import {
	SelectableGroupContext,
	SelectionType,
} from "../../../packages/common/hoc";
import { GroupBinding, GroupBindingContainer } from "../../common/selectable";
import { ListRole, ListType } from "./types";

const [createListContext, getListContext] = createContextBuilder<ListContext>();
export { createListContext, getListContext };

export const [
	setCreateMDCListInstance,
	getCreateMDCListInstance,
] = createContextPropBuilder<boolean>();

export interface ListContext extends SelectableGroupContext {
	role: ListRole | "listbox";
	isNav: boolean;
	list: MDCList;
	group: GroupBinding;
	selectionType: SelectionType;
	registerItem(item: ItemContext): void;
	unregisterItem(item: ItemContext): void;
	reinitialize(): void;
}
