<script lang="ts" context="module">
	export interface OnMountedEvent {
		value: number;
	}
</script>

<script lang="ts">
	import { parseClassList } from "../../common/functions";
	import { SliderValueText } from ".";
	import { getFormFieldContext } from "../../form-field";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { UseState } from "../../common/hooks";

	export let min: number = 0;
	export let max: number = 100;
	export let value: number = min;

	export let disabled: boolean;
	export let valueText: string | SliderValueText;
	export let discrete: boolean;
	export let hideValueIndicator: boolean;
	export let name: string;
	export let ariaLabel: string;

	const dispatch = createEventDispatcher<{
		mounted: OnMountedEvent;
		destroyed: undefined;
	}>();

	let indicatorTextElement: HTMLDivElement;
	let indicatorTextElementObserver: MutationObserver;

	let _valueText: string;
	$: _valueText =
		typeof valueText === "string"
			? valueText
			: typeof valueText === "function"
			? valueText(value)
			: undefined;

	const formFieldContext$ = getFormFieldContext();

	onMount(() => {
		if (discrete) {
			indicatorTextElementObserver = new MutationObserver(() => {
				updateValueText();
			});
		}

		istantiate();

		tick().then(() => {
			dispatch("mounted", {
				value,
			});
		});
	});

	onDestroy(() => {
		dispatch("destroyed");
	});

	export function istantiate() {
		indicatorTextElementObserver?.observe(indicatorTextElement, {
			childList: true,
		});
	}

	export function destroy() {
		indicatorTextElementObserver?.disconnect();
	}

	function updateValueText() {
		if (indicatorTextElement)
			indicatorTextElement.textContent = _valueText ?? String(value);
	}

	export function getValue() {
		return value;
	}
</script>

<style>
	:global(.mdc-slider__value-indicator-text) {
		white-space: nowrap;
	}

	:global(.mdc-slider__value-indicator.smui-slider__value-indicator--hidden) {
		display: none;
	}
</style>

<svelte:options immutable={true} />

<UseState value={[_valueText, value]} onUpdate={updateValueText} />

<input type="number" style="display: none;" bind:value {name} />

<div
	class="mdc-slider__thumb"
	role="slider"
	tabindex={disabled ? -1 : 0}
	aria-disabled={disabled}
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuenow={value}
	aria-valuetext={_valueText}
	aria-labelledby={$formFieldContext$ && $formFieldContext$.labelId}
	aria-label={(!$formFieldContext$ || !$formFieldContext$.labelId) && ariaLabel ? ariaLabel : undefined}>
	{#if discrete}
		<div class="mdc-slider__value-indicator-container">
			<div
				class={parseClassList([
					'mdc-slider__value-indicator',
					[hideValueIndicator, 'smui-slider__value-indicator--hidden'],
				])}>
				<span
					bind:this={indicatorTextElement}
					class="mdc-slider__value-indicator-text">{_valueText != undefined ? _valueText : value}</span>
			</div>
		</div>
	{/if}
	<div class="mdc-slider__thumb-knob" />
</div>
