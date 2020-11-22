<script lang="ts">
	import { parseClassList, StringListToFilter } from "../../common/functions";
	import { MDCSlider } from "@material/slider";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { getFormFieldContext } from "../../form-field";
	import { Use, UseState } from "../../common/hooks";
	import { SliderChangeEvent, SliderValue, SliderValueText } from ".";
	import { initValue } from "./initValue";
	import SliderThumb, { OnMountedEvent } from "./SliderThumb.svelte";
	import SliderImpl from "./SliderImpl.svelte";
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

	export let min: number = undefined;
	export let max: number = undefined;
	export let step: number = undefined;
	export let value: SliderValue = min;

	$: if (min < 0) min = 0;
	$: if (max < min) max = min;
	//#endregion

	let discrete: boolean;
	$: discrete = !!step;

	let range: boolean;
	$: range = Array.isArray(value) && value.length === 2;

	let _value: [number] | [number, number];
	$: _value = initValue(value, min, max, step, range);

	let thumbsInstances: SliderThumb[] = [];

	const dispatch = createEventDispatcher<{
		change: SliderChangeEvent;
		mounted: undefined;
	}>();

	const formFieldContext$ = getFormFieldContext();

	let slider: MDCSlider;

	$: if (slider) {
		if (slider.getDisabled() !== disabled) {
			slider.setDisabled(disabled);
		}
	}

	onMount(() => {
		istantiate();
	});

	onDestroy(() => {
		destroy();
	});

	export function istantiate() {
		destroy();

		slider = new MDCSlider(dom);
		slider.listen("MDCSlider:input", handleChange);

		thumbsInstances.forEach((thumb) => {
			thumb?.istantiate?.();
		});
	}

	function destroy() {
		thumbsInstances.forEach((thumb) => {
			thumb?.destroy?.();
		});

		slider?.destroy();
	}

	function setValue(newValue: [number] | [number, number]) {
		if (_value[0] !== newValue[0] || _value[1] !== newValue[1]) {
			_value = [...newValue];

			if (range) {
				value = _value as [number, number];
			} else {
				value = _value[0] as number;
			}
		}
	}

	function handleChange() {
		if (range) {
			setValue([slider.getValueStart(), slider.getValue()]);
		} else {
			setValue([slider.getValue()]);
		}

		dispatch("change", {
			dom,
			value: value[0],
		});
	}

	function setFormFieldInput(slider: MDCSlider) {
		$formFieldContext$?.setInput(slider as any);
	}

	function handleValueUpdate() {
		try {
			if (range) {
				if (slider.getValueStart() !== _value[0]) {
					slider.setValueStart(_value[0]);
				}

				if (slider.getValue() !== _value[1]) {
					slider.setValue(_value[1]);
				}
			} else {
				if (slider.getValue() !== _value[0]) {
					slider.setValue(_value[0]);
				}
			}
		} catch {}
	}

	function handleThumbMounted(thumb: OnMountedEvent, index: number) {
		if (_value[index] !== thumb.value) {
			const newValue = [..._value];
			newValue[index] = thumb.value;
			setValue(_value);
		}
	}

	function updateThumbsInstances() {
		thumbsInstances = [...thumbsInstances];
	}

	$: props.tabindex = props.tabindex || 0;
</script>

<style>
	:global(.mdc-slider) {
		min-width: 200px;
	}
</style>

<svelte:options immutable={true} />

<Use effect hook={() => setFormFieldInput(slider)} when={!!slider} />
<UseState value={[step, tickMarks, dom]} onUpdate={istantiate} />
<UseState {value} onUpdate={handleValueUpdate} />

{#key range}
	<div
		bind:this={dom}
		{...props}
		{id}
		class={parseClassList([
			className,
			'mdc-slider',
			[step, 'mdc-slider--discrete'],
			[tickMarks, 'mdc-slider--tick-marks'],
			[range, 'mdc-slider mdc-slider--range'],
		])}
		data-step={step}
		{style}
		{title}>
		<div class="mdc-slider__track">
			<div class="mdc-slider__track--inactive" />
			<div class="mdc-slider__track--active">
				<div class="mdc-slider__track--active_fill" />
			</div>
		</div>
		{#if tickMarks}
			<div class="mdc-slider__tick-marks" />
		{/if}
		{#each _value as _val, index}
			<SliderThumb
				bind:this={thumbsInstances[index]}
				bind:value={_value[index]}
				bind:min
				bind:max
				{disabled}
				{ariaLabel}
				{valueText}
				{discrete}
				{hideValueIndicator}
				{name}
				on:mounted={(e) => handleThumbMounted(e.detail, index)}
				on:destroyed={updateThumbsInstances} />
		{/each}
	</div>
{/key}
