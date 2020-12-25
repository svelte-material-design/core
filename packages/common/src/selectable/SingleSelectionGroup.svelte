<script lang="ts">
	import { UseState } from "../../hooks";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
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

	export let value: string = undefined;
	export let nullable: boolean = true;

	let items$ = createComponentsGroupStore<SelectableItem>();
	let group: SelectionGroupBinding = {
		items$,
		updateItem,
		registerItem,
		unregisterItem,
	};
	let valueState: UseState;
	let mounted: boolean = false;

	const dispatch = createEventDispatcher<{
		change: OnSingleSelectionGroupChangeEvent;
		optionsChange: OnSelectionGroupOptionsChangeEvent;
	}>();

	//checkAndFixValue();

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
				if (!$items$.some((item) => item.selected) && $items$.length) {
					value = $items$[0].value;
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
			if (value === item.value && !item.selected) {
				item.setSelected(true);
			} else if (value !== item.value && item.selected) {
				item.setSelected(false);
			}
		});
	}

	function checkAndFixValue() {
		if (typeof value !== "string") {
			if (Array.isArray(value) && typeof value[0] === "string") {
				value = value[0];
			} else if (nullable || !$items$.length) {
				if (value != undefined) {
					value = undefined;
				}
			}
		}
	}

	function handleValueUpdate() {
		checkAndFixValue();

		if (
			!nullable &&
			$items$.length &&
			(!value || !$items$.some((item) => item.value === value))
		) {
			value = $items$[0].value;
		}

		if (value) {
			const item = $items$.find((item) => item.value === value);
			if (item && !item.selected) {
				item.setSelected(true);
			}
		}

		updateItems();
		updateItemsRef();
	}

	function updateItemsRef() {
		$items$ = [...$items$];
	}

	function getItemIndex(item: SelectableItem) {
		return $items$.indexOf(item);
	}

	function updateValue() {
		const newValue = $items$.find(($items$) => $items$.selected)?.value;

		if (nullable) {
			value = newValue;
		} else {
			value = newValue
				? newValue
				: $items$.length
				? $items$[0].value
				: undefined;
		}
	}

	async function updateItem(item: SelectableItem) {
		console.warn("updateItem", item);
		const newValue = item.selected ? item.value : undefined;

		if (newValue !== value) {
			setValue(newValue);
			updateItems();
			updateItemsRef();

			await tick();

			dispatch("change", {
				value,
			});
		}
	}

	async function unregisterItem(item: SelectableItem) {
		items$.unregisterItem(item);

		if (value === item.value) {
			setValue(undefined);
			dispatch("change", {
				value,
			});
		}

		await tick();

		dispatch("optionsChange", {
			items: $items$,
		});
	}

	async function registerItem(item: SelectableItem) {
		items$.registerItem(item);
		if (mounted) {
			const oldValue = value;
			updateValue();
			if (oldValue !== value) {
				dispatch("change", {
					value,
				});
			}
		}

		await tick();

		dispatch("optionsChange", {
			items: $items$,
		});
	}

	function setValue(newValue: string) {
		if (destroyed) return;

		if (newValue) {
			value = newValue;
		} else if (nullable && !newValue) {
			value = undefined;
		} else if (!nullable && !newValue) {
			value = $items$.length ? $items$[0].value : undefined;
		}

		valueState?.setValue(value);
	}

	export function getItems() {
		return $items$;
	}

	export function setSelected(item: SelectableItem, selected: boolean) {
		if (item.selected !== selected) {
			if (!selected && value === item.value) {
				setValue(undefined);
			} else if (selected) {
				setValue(item.value);
			}
			updateItems();
			updateItemsRef();
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
