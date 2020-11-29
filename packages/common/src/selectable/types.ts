export interface SelectableItem {
	selected: boolean;
	dom: HTMLElement;
	value: string;
	setSelected(value: boolean): void;
}

export interface GroupBinding {
	registerItem(item: SelectableItem): void;
	unregisterItem(item: SelectableItem): void;
	updateItem(item: SelectableItem): void;
}

export class GroupBindingContainer {
	group: GroupBinding = {} as GroupBinding;
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
