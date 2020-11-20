<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/slider/Slider:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = undefined;
	//#endregion

	// Slider
	import SliderImpl from "./SliderImpl.svelte";

	export let disabled: boolean = false;
	export let min: number = 0;
	export let max: number = 100;
	export let value: number = min;
	export let ariaLabel: string = undefined;
	export let ariaValueText: string | ((value: number) => string) = undefined;
	export let name: string = undefined;
</script>

<SliderImpl
	class={className}
	{style}
	bind:dom
	bind:id
	bind:value
	bind:min
	bind:max
	bind:disabled
	{name}
	{ariaLabel}
	{ariaValueText}
	{props} />
