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
	export let ariaLabel: string = undefined;
	export let ariaValueText: string | ((value: number) => string) = undefined;
	export let tickMarks: boolean = false;

	$: if (value == null || value < min) value = min;
	$: if (value > max) value = max;

	const dispatch = createEventDispatcher<{
		change: SliderChangeEvent;
	}>();

	const formFieldContext$ = getFormFieldContext();
	const dialogContext$ = getDialogContext();

	let slider: MDCSlider;
	onMount(() => {
		reistantiate();
	});

	$: if (slider) {
		if (slider.getDisabled() !== disabled) {
			slider.setDisabled(disabled);
		}

		if (slider.getValue() !== value) {
			slider.setValue(value);
		}

		// if ($dialogContext$?.isOpen) slider.layout();
	}

	onDestroy(() => {
		slider && slider.destroy();
	});

	function setAriaValueTextMapFn(
		oldValue: typeof ariaValueText = undefined,
		newAriaValueText = ariaValueText
	) {
		if (
			typeof oldValue === "function" &&
			typeof newAriaValueText !== "function"
		) {
			slider.setValueToAriaValueTextFn(undefined);
		} else if (typeof newAriaValueText === "function") {
			slider.setValueToAriaValueTextFn(newAriaValueText);
		}
	}

	function reistantiate() {
		slider?.destroy();
		slider = new MDCSlider(dom);
		slider.listen("MDCSlider:input", handleChange);

		setAriaValueTextMapFn();
	}

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
		value = slider.getValue();

		dispatch("change", {
			dom,
			value,
		});
	}

	function getAriaValueText(_value: typeof value) {
		return typeof ariaValueText === "string"
			? ariaValueText
			: typeof ariaValueText === "function"
			? ariaValueText(value)
			: undefined;
	}

	export function layout() {
		return slider.layout();
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
<UseState value={ariaValueText} onUpdate={setAriaValueTextMapFn} />
<UseState value={[min, max, step]} onUpdate={reistantiate} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-slider',
		[discrete, 'mdc-slider--discrete'],
		[discrete && displayMarkers, 'mdc-slider--display-markers'],
		[tickMarks, 'mdc-slider--tick-marks'],
	])}
	data-step={step}
	{style}>
	<div class="mdc-slider__track">
		<div class="mdc-slider__track--inactive" />
		<div class="mdc-slider__track--active">
			<div class="mdc-slider__track--active_fill" />
		</div>
	</div>
	{#if tickMarks}
		<div class="mdc-slider__tick-marks">
			{#each Array(value).fill('') as _}
				<div class="mdc-slider__tick-mark--active" />
			{/each}
			{#each Array(max - value).fill('') as _}
				<div class="mdc-slider__tick-mark--inactive" />
			{/each}
		</div>
	{/if}
	<div
		class="mdc-slider__thumb"
		role="slider"
		tabindex={disabled ? -1 : 0}
		aria-disabled={disabled}
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={value}
		aria-valuetext={getAriaValueText(value)}
		aria-labelledby={$formFieldContext$ && $formFieldContext$.labelId}
		aria-label={(!$formFieldContext$ || !$formFieldContext$.labelId) && ariaLabel ? ariaLabel : undefined}>
		{#if discrete}
			<div class="mdc-slider__value-indicator-container">
				<div class="mdc-slider__value-indicator">
					<span class="mdc-slider__value-indicator-text"> {value} </span>
				</div>
			</div>
		{/if}
		<div class="mdc-slider__thumb-knob" />
	</div>
	<!-- TODO: Range :D <div 
		class="mdc-slider__thumb"
		role="slider"
		tabindex="0"
		aria-label="Discrete range slider demo"
		aria-valuemin="0"
		aria-valuemax="100"
		aria-valuenow="50">
		<div class="mdc-slider__value-indicator-container">
			<div class="mdc-slider__value-indicator">
				<span class="mdc-slider__value-indicator-text"> 50 </span>
			</div>
		</div>
		<div class="mdc-slider__thumb-knob" />
	</div> -->
</div>
