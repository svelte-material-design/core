<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/slider/DiscreteRangeSlider:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Slider
	import SliderImpl from "./SliderImpl.svelte";
	import { SliderValueText } from ".";

	export let min: number = 0;
	export let max: number = 100;
	export let gap: number = 0;
	export let step: number = 1;
	export let value: [number, number] = [min, max];

	export let disabled: boolean = false;

	export let ariaLabel: string = undefined;
	export let valueText: SliderValueText = undefined;

	export let name: string = undefined;
	export let title: string = undefined;

	export let tickMarks: boolean = false;
	export let hideValueIndicator: boolean = undefined;
</script>

<svelte:options immutable={true} />

<SliderImpl
	class={className}
	{style}
	bind:dom
	bind:id
	bind:value
	bind:min
	bind:max
	bind:step
	bind:disabled
	range
	{gap}
	{tickMarks}
	{hideValueIndicator}
	{name}
	{title}
	{ariaLabel}
	{valueText}
	{props}
	on:change />
