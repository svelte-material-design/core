import { ComponentsGroupStore } from "../components-group";

export interface SelectableItem {
	selected: boolean;
	dom: HTMLElement;
	value: string;
	setSelected(value: boolean): void;
	getComponentContext(): any;
}

export interface OnSingleSelectionGroupChangeEvent {
	value: string;
}

export interface OnSelectionGroupOptionsChangeEvent {
	items: SelectableItem[];
}

export interface OnMultiSelectionGroupChangeEvent {
	value: string;
}

export interface OnSelectableChangeEvent {
	selected: boolean;
}

export interface SelectionGroupBinding<
	T extends SelectableItem = SelectableItem
> {
	items$: ComponentsGroupStore<T>;
	updateItem(item: T): void | Promise<void>;
	registerItem(item: T): void | Promise<void>;
	unregisterItem(item: T): void | Promise<void>;
}

export type SelectionType = "single" | "multi";
