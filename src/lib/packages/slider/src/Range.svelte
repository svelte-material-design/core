<svelte:options immutable={true} />

<script lang="ts">
	import { GroupItem } from "@raythurnevoid/svelte-group-components/ts/components-group";
	import { UseState } from "@raythurnevoid/svelte-hooks";

	//#region  imports
	import { createEventDispatcher, onMount, tick } from "svelte";
	import { classList } from "@raythurnevoid/strings-filter";
	import { getSliderContext, setRangeContext } from "./SliderContext";
	import type { OnRangeChangeEvent } from "./types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLInputElement = undefined;
	//#endregion

	export let min: number = 0;
	export let max: number = 100;
	export let value: number = min;

	$: if (min == null || min < 0) min = 0;
	$: if (max == null) max = 100;
	$: if (max <= min) max = min + 1;
	$: if (value == null || value < min) value = min;
	$: if (value > max) value = max;
	//#endregion

	//#region implementation
	let valueState: UseState;

	const context$ = setRangeContext({
		value,
		min,
		max,
		setValue,
		setMin,
		setMax,
	});
	const context = $context$;
	$: $context$ = { ...Object.assign(context, { value, min, max }) };
	const sliderContext$ = getSliderContext();

	const dispatch = createEventDispatcher<{
		input: OnRangeChangeEvent;
		change: OnRangeChangeEvent;
	}>();

	onMount(() => {
		if (!dom.getAttribute("value")) {
			updateValueAttr();
		}
	});

	async function setValue(newValue: number, event?: "input" | "change") {
		value = newValue;
		valueState.setValue(newValue);
		if (event) {
			await tick();
			dispatch(event, {
				dom,
				value,
			});
		}
	}

	function setMin(newValue: number) {
		min = newValue;
	}

	function setMax(newValue: number) {
		max = newValue;
	}

	function handleOptionsUpdate() {
		$sliderContext$.reistantiate();
	}

	async function handleValueUpdate() {
		updateValueAttr();
		$sliderContext$.handleValueUpdate();
	}

	function updateValueAttr() {
		// Svelte doesn't set the value attribute at runtime but only in ssr
		dom.setAttribute("value", "" + value);
	}
	//#endregion
</script>

<UseState bind:this={valueState} {value} onUpdate={handleValueUpdate} />
<UseState value={[min, max]} onUpdate={handleOptionsUpdate} />

<GroupItem bind:dom group={$sliderContext$.group} {context}>
	<input
		bind:this={dom}
		{id}
		class={classList([className, "mdc-slider__input"])}
		{style}
		{value}
		{min}
		{max}
		{...$$restProps}
		disabled={$sliderContext$.disabled}
		step={$sliderContext$.step}
		type="range"
		on:focus
		on:blur
	/>
	<slot {value} />
</GroupItem>
