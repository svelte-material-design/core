<script lang="ts">
	import { UseState } from "../../hooks";
	import { onDestroy, onMount, tick } from "svelte";
	import {
		ComponentsGroupStore,
		createComponentsGroupStore,
	} from "../components-group";
	import {
		SelectableItem,
		OnSelectionGroupOptionsChangeEvent,
		OnSingleSelectionGroupChangeEvent,
	} from "./types";
	import { SelectionGroupBinding } from ".";

	export let value: string[] = undefined;
	export let nullable: boolean = true;

	let items$: ComponentsGroupStore = createComponentsGroupStore();
	let group: SelectionGroupBinding = {
		items$,
		updateItem,
		registerItem,
		unregisterItem,
	};
	let valueState: UseState;
	let mounted: boolean = false;

	onMount(async () => {
		checkAndFixValue();
		await tick();

		if (nullable) {
			if (value === null || value !== undefined) {
				updateItems();
			} else {
				updateValue();
			}
		} else {
			if (value != undefined && value.length > 0) {
				updateItems();
				if (!isSomeItemSelected() && $items$.length) {
					value = [$items$[0].value];
				}
			} else {
				updateValue();
			}
		}

		mounted = true;
	});

	let destroyed = false;
	onDestroy(() => {
		destroyed = true;
	});

	function updateItems() {
		if (destroyed) return;

		$items$.forEach((item) => {
			if (
				(nullable && value === null) ||
				(!item.selected && value.includes(item.value))
			) {
				item.setSelected(true);
			} else if (item.selected && !value.includes(item.value)) {
				item.setSelected(false);
			}
		});
	}

	function checkAndFixValue() {
		if (!Array.isArray(value)) {
			if (typeof value === "string") {
				value = [value];
			} else if (nullable || !$items$.length) {
				if (value != undefined) {
					value = undefined;
				}
			}
		}
	}

	function handleValueUpdate() {
		checkAndFixValue();

		if (!nullable) {
			if (
				$items$.length &&
				(!$items$.some((item) => value.includes(item.value)) ||
					value == undefined ||
					!value.length)
			) {
				setValue([$items$[0].value]);
			}
		}

		value?.forEach((itemValue) => {
			const item = $items$.find((item) => item.value === itemValue);
			if (item && !item.selected) {
				item.setSelected(true);
			}
		});

		$items$
			.filter((item) => !value || !value.includes(item.value))
			.forEach((item) => {
				if (item.selected) {
					item.setSelected(false);
				}
			});

		updateItemsRef();
	}

	function updateItemsRef() {
		$items$ = [...$items$];
	}

	function getItemIndex(item: SelectableItem) {
		return $items$.indexOf(item);
	}

	function updateValue() {
		let newValue = $items$
			.filter(($items$) => $items$.selected)
			.map(($items$) => $items$.value);

		if (nullable) {
			setValue(newValue);
		} else {
			newValue = newValue.length
				? newValue
				: $items$.length
				? [$items$[0].value]
				: [];
			setValue(newValue);
		}
	}

	function updateItem(item: SelectableItem) {
		console.warn("updateItem", item);
		updateValue();
		updateItems();
		updateItemsRef();
	}

	function unregisterItem(item: SelectableItem) {
		items$.unregisterItem(item);
		updateValue();
	}

	function registerItem(item: SelectableItem) {
		items$.registerItem(item);
		if (mounted) {
			updateValue();
		}
	}

	function isSomeItemSelected() {
		return $items$.length && $items$.some((item) => item.selected);
	}

	function setValue(newValue: string[]) {
		value = newValue;
		valueState?.setValue?.(value);
	}

	export function getItems() {
		return $items$;
	}

	export function setSelected(item: SelectableItem, selected: boolean) {
		if (item.selected !== selected) {
			item.setSelected(selected);
			updateItemsRef();
			updateValue();
		}
	}

	export function getBindings() {
		return group;
	}
</script>

<svelte:options immutable={true} />

<UseState bind:this={valueState} {value} onUpdate={handleValueUpdate} />
<UseState value={nullable} onUpdate={updateValue} />

<slot {group} />
