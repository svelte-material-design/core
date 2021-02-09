<svelte:options immutable={true} />

<script lang="ts" context="module">
	export interface OnMountedEvent {
		value: number;
	}
</script>

<script lang="ts">
	//#region  imports
	import { parseClassList } from "../../common/functions";
	import { getFormFieldContext } from "../../form-field";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { getSliderContext, getRangeContext } from "./SliderContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		mounted: OnMountedEvent;
		destroyed: undefined;
	}>();

	const sliderContext$ = getSliderContext();

	let indicatorTextElement: HTMLSpanElement;
	let valueTextElement: HTMLSpanElement;
	let indicatorTextElementObserver: MutationObserver;

	const formFieldContext$ = getFormFieldContext();

	onMount(() => {
		$sliderContext$.reistantiate();
		if ($sliderContext$.discrete) {
			let doNotObserve: boolean = false;
			indicatorTextElementObserver = new MutationObserver(async () => {
				if (doNotObserve) {
					doNotObserve = false;
					return;
				}

				await tick();

				doNotObserve = true;
				updateValueText();
			});
		}

		reistantiate();
	});

	onDestroy(() => {
		dispatch("destroyed");
	});

	function updateValueText() {
		if (indicatorTextElement && $$slots.default) {
			indicatorTextElement.innerHTML = valueTextElement.innerHTML;
		}
	}

	export function reistantiate() {
		indicatorTextElementObserver?.disconnect();
		indicatorTextElementObserver?.observe(indicatorTextElement, {
			childList: true,
		});
	}

	export function destroy() {
		indicatorTextElementObserver?.disconnect();
	}
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={parseClassList([className, "mdc-slider__thumb"])}
	{style}
	{...$$restProps}
	role="slider"
	aria-labelledby={$formFieldContext$ && $formFieldContext$.labelId}
>
	{#if $sliderContext$.discrete}
		<div class="mdc-slider__value-indicator-container">
			<div
				class={parseClassList([
					"mdc-slider__value-indicator",
					[!$$slots.default, "svmd-slider__value-indicator--hidden"],
				])}
			>
				<span
					bind:this={indicatorTextElement}
					class="mdc-slider__value-indicator-text"><slot /></span
				>
				<span style="display: none" bind:this={valueTextElement}><slot /></span>
			</div>
		</div>
	{/if}
	<div class="mdc-slider__thumb-knob" />
</div>

<style>
	:global(.mdc-slider__value-indicator-text) {
		white-space: nowrap;
	}

	:global(.mdc-slider__value-indicator.svmd-slider__value-indicator--hidden) {
		display: none;
	}
</style>
