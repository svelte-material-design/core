<svelte:options immutable={true} />

<script lang="ts">
	import { parseClassList } from "../../common/functions";
	import { MDCSlider } from "@material/slider";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { getFormFieldContext } from "../../form-field";
	import { Use, UseState } from "@raythurnevoid/svelte-hooks";
	import type {
		SliderChangeEvent,
		SliderValueText,
		RangeSliderChangeEvent,
	} from ".";
	import SliderThumb, { OnMountedEvent } from "./SliderThumb.svelte";
	import { BaseProps } from "../../common/dom/Props";

	//#region exports
	export let dom: HTMLDivElement;
	export let id: string;
	export let style: string;
	let className: string;
	export { className as class };
	export let props: BaseProps = undefined;

	export let tickMarks: boolean;
	export let disabled: boolean;
	export let name: string;
	export let title: string;
	export let ariaLabel: string;
	export let valueText: SliderValueText;
	export let hideValueIndicator: boolean;

	export let gap: number;
	export let range: boolean = false;
	export let min: number = undefined;
	export let max: number = undefined;
	export let step: number = undefined;
	export let value: [number] | [number, number] = range ? [min, max] : [min];

	$: if (min < 0) min = 0;
	$: if (max < min) max = min + 1;
	//#endregion

	let width: number = undefined;
	let resizeObserver: any;

	let discrete: boolean;
	$: discrete = !!step;

	updateValue();

	let thumbsInstances: SliderThumb[] = [];

	const dispatch = createEventDispatcher<{
		change: RangeSliderChangeEvent;
	}>();

	const formFieldContext$ = getFormFieldContext();

	let slider: MDCSlider;

	$: if (slider) {
		if (slider.getDisabled() !== disabled) {
			slider.setDisabled(disabled);
		}
	}

	onMount(() => {
		initResizeObserver();
		instantiate();
	});

	onDestroy(() => {
		destroy();
	});

	function getNegativeGap() {
		return range && value[1] - value[0] < gap
			? Math.abs(value[1] - value[0] - gap)
			: 0;
	}

	function updateValue() {
		let newValue: [number] | [number, number] = [...value];

		if (range) {
			let negativeGap = getNegativeGap();
			if (value[0] - negativeGap < min) newValue[0] = min;
			else newValue[0] = value[0] - negativeGap;
			negativeGap -= value[0] - newValue[0];
			if (value[1] + negativeGap > max) newValue[1] = max;
			else newValue[1] = value[1] + negativeGap;
		}

		newValue = newValue.map((v) => {
			if (v < min) return min;
			if (v > max) return max;
			return v;
		}) as typeof value;

		setValue(newValue);
	}

	function initResizeObserver() {
		// @ts-ignore
		resizeObserver = new ResizeObserver((entries) => {
			const newWidth: number = entries[0].borderBoxSize[0].inlineSize;
			if (width === undefined) {
				width = newWidth;
			} else if (width !== newWidth) {
				width = newWidth;
				instantiate();
			}
		});
	}

	export function instantiate() {
		destroy();

		updateValue();

		tick().then(() => {
			slider = new MDCSlider(dom);
			slider.listen("MDCSlider:input", handleChange);

			thumbsInstances.forEach((thumb) => {
				thumb?.istantiate?.();
			});

			resizeObserver.observe(dom);
		});
	}

	function destroy() {
		thumbsInstances.forEach((thumb) => {
			thumb?.destroy?.();
		});

		resizeObserver?.disconnect();

		slider?.destroy();
	}

	function setValue(newInnerValue: [number] | [number, number]) {
		if (value?.[0] !== newInnerValue[0] || value?.[1] !== newInnerValue[1]) {
			value = [...newInnerValue];
		}
	}

	function handleChange() {
		if (range) {
			if (gap > slider.getValue() - slider.getValueStart()) {
				slider.setValueStart(value[0]);
				slider.setValue(value[1]);
			}

			setValue([slider.getValueStart(), slider.getValue()]);
		} else {
			setValue([slider.getValue()]);
		}

		dispatch("change", {
			dom,
			value,
		} as RangeSliderChangeEvent);
	}

	function setFormFieldInput(slider: MDCSlider) {
		$formFieldContext$?.setInput(slider as any);
	}

	function handleValueUpdate(oldValue: typeof value) {
		try {
			if (range) {
				if (slider.getValueStart() !== value[0]) {
					slider.setValueStart(value[0]);
				}

				if (slider.getValue() !== value[1]) {
					slider.setValue(value[1]);
				}
			} else {
				if (slider.getValue() !== value[0]) {
					slider.setValue(value[0]);
				}
			}
		} catch {}
	}

	function handleThumbMounted(thumb: OnMountedEvent, index: number) {
		if (value[index] !== thumb.value) {
			const newValue = [...value];
			newValue[index] = thumb.value;
			setValue(value);
		}
	}

	function updateThumbsInstances() {
		thumbsInstances = [...thumbsInstances];
	}

	$: props.tabindex = props.tabindex || 0;
</script>

<Use effect hook={() => setFormFieldInput(slider)} when={!!slider} />
<UseState value={[value, step, min, max, range, gap]} onUpdate={updateValue} />
<UseState
	value={[step, tickMarks, step, min, max, dom]}
	onUpdate={instantiate}
/>
<UseState {value} onUpdate={handleValueUpdate} />

{#key range}
	<div
		bind:this={dom}
		{...props}
		{id}
		class={parseClassList([
			className,
			"mdc-slider",
			[step, "mdc-slider--discrete"],
			[tickMarks, "mdc-slider--tick-marks"],
			[range, "mdc-slider mdc-slider--range"],
		])}
		data-step={step}
		{style}
		{title}
	>
		{#each value as _val, index}
			<input
				class="mdc-slider__input"
				type="range"
				{min}
				{max}
				value={value[index]}
				{name}
			/>
		{/each}
		<div class="mdc-slider__track">
			<div class="mdc-slider__track--inactive" />
			<div class="mdc-slider__track--active">
				<div class="mdc-slider__track--active_fill" />
			</div>
		</div>
		{#if tickMarks}
			<div class="mdc-slider__tick-marks" />
		{/if}
		{#each value as _val, index}
			<SliderThumb
				bind:this={thumbsInstances[index]}
				value={value[index]}
				{disabled}
				{valueText}
				{discrete}
				{hideValueIndicator}
				on:mounted={(e) => handleThumbMounted(e.detail, index)}
				on:destroyed={updateThumbsInstances}
			/>
		{/each}
	</div>
{/key}

<style>
	:global(.mdc-slider) {
		width: 180px;
	}
</style>
