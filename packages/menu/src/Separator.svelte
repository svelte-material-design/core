<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu/Separator:${count++}`;

	export let dom: HTMLLIElement | HTMLHRElement = undefined;
	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Separator
	import { Separator } from "../../list/src/internal/separator";

	export let insetPadding: boolean = false;
	export let insetLeading: boolean = false;
	export let insetTrailing: boolean = false;
</script>

<svelte:options immutable={true} />

<Separator
	bind:dom
	{props}
	{id}
	class={className}
	{style}
	{insetPadding}
	{insetLeading}
	{insetTrailing} />
