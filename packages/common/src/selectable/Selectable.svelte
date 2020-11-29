<script lang="ts" context="module">
	let count: number = 0;
</script>

<script lang="ts">
	import { UseState } from "../../hooks";
	import { onDestroy, onMount, tick } from "svelte";
	import { GroupBinding, SelectableItem } from "./types";

	export let group: GroupBinding;
	export let value: string;
	export let dom: HTMLElement;
	export let selected: boolean;

	let mounted: boolean = false;
	let selectedState: UseState;

	const context: SelectableItem = {
		setSelected(newValue: boolean) {
			console.warn("setSelected", selected, newValue);
			_setSelected(newValue);
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
			await tick();
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
