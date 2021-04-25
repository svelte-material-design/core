<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { onMount } from "svelte";
	import { getChipSetContext } from "../ChipSetContext";
	import { Chip } from "../../../chip/src/internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let accessibleTouch: boolean = false;
	export let hideLeadingIconOnSelect: boolean = true;
	//#endregion

	//#region implementation
	const chipSetContext$ = getChipSetContext();
	$: group = group ?? $chipSetContext$?.group;

	onMount(() => {
		initialize();
	});

	function initialize() {
		$chipSetContext$?.reinitialize();
	}
	//#endregion
</script>

<Chip
	bind:dom
	{id}
	class={className}
	{style}
	bind:selected
	{value}
	{ripple}
	{accessibleTouch}
	{hideLeadingIconOnSelect}
	{group}
	disableMDCInstance
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
>
	<slot />
</Chip>
