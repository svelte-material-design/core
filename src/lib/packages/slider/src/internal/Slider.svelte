<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { MDCSlider } from "@material/slider";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { getFormFieldContext } from "../../../form-field";
	import { Use, UseState } from "@raythurnevoid/svelte-hooks";
	import { Track } from ".";
	import { setSliderContext } from "../SliderContext";
	import type { RangeContext } from "../SliderContext";
	import type { GroupItemContext } from "@raythurnevoid/svelte-group-components/components-group";
	import { Group } from "@raythurnevoid/svelte-group-components/components-group";
	import type { OnSliderChangeEvent, OnSliderInputEvent } from "../types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let tickMarks: boolean = false;
	export let disabled: boolean = false;
	export let step: number = undefined;
	//#endregion

	//#region implementation
	let group: Group;

	let width: number = undefined;
	let resizeObserver: any;
	let mounted: boolean = false;
	let reistantiating: boolean = false;

	let discrete: boolean;
	let range: boolean = false;
	let resetDOMKey: boolean = false;
	$: discrete = !!step;

	const dispatch = createEventDispatcher<{
		change: OnSliderChangeEvent;
		input: OnSliderInputEvent;
	}>();

	const formFieldContext$ = getFormFieldContext();
	const context$ = setSliderContext({
		handleValueUpdate,
		reistantiate,
		discrete,
		step,
		disabled,
	});
	$: $context$ = { ...$context$, discrete, step, disabled };

	let slider: MDCSlider;

	$: if (slider) {
		if (slider.getDisabled() !== disabled) {
			slider.setDisabled(disabled);
		}
	}

	onMount(async () => {
		$context$ = { ...$context$, group: group.getBindings() };
		await tick();

		initResizeObserver();
		istantiate();

		mounted = true;
	});

	onDestroy(() => {
		destroy();
	});

	function initResizeObserver() {
		// @ts-ignore
		resizeObserver = new ResizeObserver((entries) => {
			const newWidth: number = entries[0].borderBoxSize[0].inlineSize;
			if (width === undefined) {
				width = newWidth;
			} else if (width !== newWidth) {
				width = newWidth;
				istantiate();
			}
		});
	}

	export async function reistantiate() {
		if (!mounted || reistantiating) return;

		reistantiating = true;
		resetDOMKey = !resetDOMKey;

		await tick();

		istantiate();
	}

	async function istantiate() {
		destroy();

		if (group.getItems().length > 1) {
			range = true;
		} else {
			range = false;
		}

		checkAndFixRanges();

		await tick(); // TODO: Implement async cargo

		slider = new MDCSlider(dom);
		slider.listen("MDCSlider:change", handleChange);
		slider.listen("MDCSlider:input", handleInput);

		resizeObserver.observe(dom);
		reistantiating = false;
	}

	function destroy() {
		resizeObserver?.disconnect();

		slider?.destroy();
	}

	async function handleInput() {
		updateRanges("input");

		await tick();

		dispatch("input", {
			dom,
			value: getValues(),
		});
	}

	async function handleChange() {
		updateRanges("change");

		dispatch("change", {
			dom,
			value: getValues(),
		});
	}

	function getValues() {
		return getItems().map((item) => item.value) as [number] | [number, number];
	}

	function setFormFieldInput(slider: MDCSlider) {
		$formFieldContext$?.setInput(slider as any);
	}

	function checkAndFixRanges() {
		const items = getItems();

		if (range) {
			if (items[0].min >= items[1].max) {
				items[1].setMax(items[0].max);
			}

			if (items[0].value > items[1].value) {
				items[0].setValue(items[1].value);
				return false;
			}
		}

		return true; // valid value
	}

	async function handleValueUpdate() {
		let items = getItems();

		if (isRange() && checkAndFixRanges()) {
			if (slider.getValueStart() !== items[0].value) {
				slider.setValueStart(items[0].value);
			}

			if (slider.getValue() !== items[1].value) {
				slider.setValue(items[1].value);
			}
		} else {
			if (slider.getValue() !== items[0].value) {
				slider.setValue(items[0].value);
			}
		}

		updateRanges();
	}

	function isRange() {
		try {
			return range && slider.getValueStart() != null;
		} catch {
			return false;
		}
	}

	function getItems(): RangeContext[] {
		//@ts-ignore TODO:
		const items = group.getItems() as GroupItemContext<RangeContext>[];
		return items.map((item) => item.externalContext);
	}

	function updateRanges(event?: "input" | "change") {
		const items = getItems();
		items[0].setValue(
			isRange() ? slider.getValueStart() : slider.getValue(),
			event
		);
		if (isRange()) {
			items[1].setValue(slider.getValue(), event);
		}
	}
	//#endregion
</script>

<Use effect hook={() => setFormFieldInput(slider)} when={!!slider} />
<UseState value={[tickMarks, step]} onUpdate={istantiate} />

<Group bind:this={group} on:optionsChange={istantiate}>
	{#key resetDOMKey}
		<div
			bind:this={dom}
			{id}
			class={classList([
				className,
				"mdc-slider",
				[step, "mdc-slider--discrete"],
				[tickMarks, "mdc-slider--tick-marks"],
				[range, "mdc-slider--range"],
			])}
			{style}
			data-step={step}
			{...$$restProps}
		>
			<slot />
			<Track />
			{#if tickMarks}
				<div class="mdc-slider__tick-marks" />
			{/if}
		</div>
	{/key}
</Group>

<style>
	:global(.mdc-slider) {
		width: 180px;
	}
</style>
