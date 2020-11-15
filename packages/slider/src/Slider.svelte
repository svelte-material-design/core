<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/slider/Slider:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Slider
	import { MDCSlider } from "@material/slider";
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { getDialogContext } from "../../../packages/dialog";
	import { getFormFieldContext } from "../../../packages/form-field";
	import { Use, UseState } from "../../../packages/common/hooks";
	import { SliderChangeEvent } from "./";

	export let disabled: boolean = false;
	export let discrete: boolean = false;
	export let displayMarkers: boolean = false;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 0.1;
	export let value: number = min;

	$: if (value == null || value < min) value = min;
	$: if (value > max) value = max;

	const dispatch = createEventDispatcher<{
		change: SliderChangeEvent;
	}>();

	const formFieldContext$ = getFormFieldContext();
	const dialogContext$ = getDialogContext();

	let slider: MDCSlider;
	onMount(() => {
		slider = new MDCSlider(dom);
		slider.listen("MDCSlider:input", handleChange);
	});

	$: if (slider) {
		if (slider.disabled !== disabled) {
			slider.disabled = disabled;
		}

		if (slider.min !== min) {
			slider.min = min;
		}

		if (slider.max !== max) {
			slider.max = max;
		}

		if (slider.step !== step) {
			slider.step = step;
		}

		if (slider.value !== value) {
			slider.value = value;
		}

		// if ($dialogContext$?.isOpen) slider.layout();
	}

	onDestroy(() => {
		slider && slider.destroy();
	});

	function handleStepUpdate() {
		const vMod = value % step;
		if (vMod) {
			value = value - vMod;
		}
	}
	function setFormFieldInput(slider: MDCSlider) {
		$formFieldContext$?.setInput(slider as any);
	}

	function handleChange() {
		value = slider.value;

		dispatch("change", {
			dom,
			value,
		});
	}

	export function layout() {
		return slider.layout();
	}

	export function stepUp(amount = 1) {
		return slider.stepUp(amount);
	}

	export function stepDown(amount = 1) {
		return slider.stepDown(amount);
	}

	$: props.tabindex = props.tabindex || 0;
</script>

<style>
	.mdc-slider {
		min-width: 200px;
	}
</style>

<Use effect hook={() => setFormFieldInput(slider)} when={!!slider} />
<UseState value={step} onUpdate={handleStepUpdate} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-slider',
		[discrete, 'mdc-slider--discrete'],
		[discrete && displayMarkers, 'mdc-slider--display-markers'],
	])}
	{style}
	role="slider"
	aria-disabled={disabled ? 'true' : 'false'}
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuenow={value}
	{...step === 0 ? {} : { 'data-step': step }}>
	<div class="mdc-slider__track-container">
		<div class="mdc-slider__track" />
		{#if discrete && displayMarkers}
			<div class="mdc-slider__track-marker-container" />
		{/if}
	</div>
	<div class="mdc-slider__thumb-container">
		{#if discrete}
			<div class="mdc-slider__pin">
				<span class="mdc-slider__pin-value-marker" />
			</div>
		{/if}
		<svg class="mdc-slider__thumb" width="21" height="21">
			<circle cx="10.5" cy="10.5" r="7.875" />
		</svg>
		<div class="mdc-slider__focus-ring" />
	</div>
</div>
