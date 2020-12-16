import { Writable, writable } from "svelte/store";
import { beforeOrAfter } from "./domBeforeOrAfter";

export function createComponentsGroupStore<
	T extends ComponentsGroupItem
>(): ComponentsGroupStore<T> {
	const { subscribe, set, update } = writable<T[]>([]);

	return {
		subscribe,
		update,
		set,
		registerItem: (item: T) =>
			update((items) => {
				items.push(item);
				if (typeof window !== "undefined") {
					items.sort((a, b) => beforeOrAfter(a.dom, b.dom));
				}
				return [...items];
			}),
		unregisterItem: (item: T) =>
			update((items) => {
				const index = items.indexOf(item);
				if (~index) {
					items = items.slice(0, index).concat(items.slice(index + 1));
				}
				return [...items];
			}),
	};
}

export interface ComponentsGroupStore<T extends ComponentsGroupItem = any>
	extends Writable<T[]> {
	registerItem(item: T);
	unregisterItem(item: T);
}

export interface ComponentsGroupItem {
	dom: HTMLElement;
}
