<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/slider/Slider:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Slider
	import { MDCSlider } from "@material/slider";
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { getDialogContext } from "../../dialog";
	import { getFormFieldContext } from "../../form-field";
	import { Use, UseState } from "../../common/hooks";
	import { SliderChangeEvent } from ".";

	//#region exports
	export let disabled: boolean = false;
	export let displayMarkers: boolean = false;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 0.1;
	export let value: number = min;
	export let ariaLabel: string = undefined;
	export let ariaValueText: string | ((value: number) => string) = undefined;
	export let tickMarks: boolean = false;

	export let name: string;

	$: if (min < 0) min = 0;
	$: if (max < min) max = min;
	$: if (value == null || value < min) value = min;
	$: if (value > max) value = max;
	//#endregion

	//#region internal props
	let discrete: boolean;
	$: discrete = !!step;

	let _ariaValueText: string;
	$: _ariaValueText =
		typeof ariaValueText === "string"
			? ariaValueText
			: typeof ariaValueText === "function"
			? ariaValueText(value)
			: undefined;

	let indicatorTextElement: HTMLDivElement;

	let indicatorTextElementObserver: MutationObserver;
	//#endregion

	const dispatch = createEventDispatcher<{
		change: SliderChangeEvent;
	}>();

	const formFieldContext$ = getFormFieldContext();
	const dialogContext$ = getDialogContext();

	let slider: MDCSlider;
	onMount(() => {
		indicatorTextElementObserver = new MutationObserver((mutations) => {
			indicatorTextElement.textContent = _ariaValueText ?? String(value);
		});

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
		destroy();
	});

	function reistantiate() {
		destroy();

		slider = new MDCSlider(dom);
		slider.listen("MDCSlider:input", handleChange);

		indicatorTextElementObserver.observe(indicatorTextElement, {
			childList: true,
		});
	}

	function destroy() {
		indicatorTextElementObserver?.disconnect();
		slider?.destroy();
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

	export function layout() {
		return slider.layout();
	}

	$: props.tabindex = props.tabindex || 0;
</script>

<style>
	.mdc-slider {
		min-width: 200px;
	}

	.mdc-slider__value-indicator-text {
		white-space: nowrap;
	}
</style>

<Use effect hook={() => setFormFieldInput(slider)} when={!!slider} />
<UseState value={step} onUpdate={handleStepUpdate} />
<UseState value={[min, max, step]} onUpdate={reistantiate} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-slider',
		[step, 'mdc-slider--discrete'],
		[tickMarks, 'mdc-slider--tick-marks'],
	])}
	data-step={step}
	{style}>
	<input type="number" style="display: none;" bind:value {name} />
	<div class="mdc-slider__track">
		<div class="mdc-slider__track--inactive" />
		<div class="mdc-slider__track--active">
			<div class="mdc-slider__track--active_fill" />
		</div>
	</div>
	{#if tickMarks}
		<div class="mdc-slider__tick-marks" />
	{/if}
	<div
		class="mdc-slider__thumb"
		role="slider"
		tabindex={disabled ? -1 : 0}
		aria-disabled={disabled}
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={0}
		aria-valuetext={_ariaValueText}
		aria-labelledby={$formFieldContext$ && $formFieldContext$.labelId}
		aria-label={(!$formFieldContext$ || !$formFieldContext$.labelId) && ariaLabel ? ariaLabel : undefined}>
		{#if discrete}
			<div class="mdc-slider__value-indicator-container">
				<div class="mdc-slider__value-indicator">
					<span
						bind:this={indicatorTextElement}
						class="mdc-slider__value-indicator-text">{_ariaValueText != undefined ? _ariaValueText : value}</span>
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
