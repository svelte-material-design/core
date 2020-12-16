<script lang="ts" context="module">
	let count: number = 0;
</script>

<script lang="ts">
	import { UseState } from "../../hooks";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import {
		SelectionGroupBinding,
		OnSelectableChangeEvent,
		SelectableItem,
	} from "./";

	export let group: SelectionGroupBinding;
	export let value: string;
	export let dom: HTMLElement;
	export let selected: boolean;
	let componentContext: any;
	export { componentContext as context };

	let mounted: boolean = false;
	let selectedState: UseState;

	const dispatch = createEventDispatcher<{
		change: OnSelectableChangeEvent;
	}>();

	const context: SelectableItem = {
		setSelected(newValue: boolean) {
			if (selected !== newValue) {
				_setSelected(newValue);

				tick().then(() => {
					dispatch("change", { selected });
				});
			}
		},
		getComponentContext() {
			return componentContext;
		},
	} as SelectableItem;

	onMount(async () => {
		await tick();

		updateContext();
		group?.registerItem(context);

		mounted = true;
	});

	onDestroy(async () => {
		group?.unregisterItem?.(context);
	});

	export function setSelected(newValue: boolean) {
		_setSelected(newValue);
		group?.updateItem(context);
	}

	function _setSelected(newValue: boolean) {
		selected = newValue;
		context.selected = selected;
		selectedState?.setValue(selected);
	}

	async function updateContext() {
		Object.assign(context, {
			selected: selected,
			dom,
			value,
		});

		if (mounted) {
			// await tick(); Causes issues when value gets updated due to a selectable update, force the user to place 2 tick to get the value updated
			group?.updateItem(context);
		}
	}

	function handleSelectedValueUpdate() {
		updateContext();
	}
</script>

<svelte:options immutable={true} />

<UseState
	bind:this={selectedState}
	value={selected}
	onUpdate={handleSelectedValueUpdate} />
<UseState value={[dom, value]} onUpdate={updateContext} />

<slot />
