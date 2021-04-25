<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { getChipSetContext } from "./ChipSetContext";
	import { Action } from "../../chip/src";
	import { onMount } from "svelte";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	const chipSetContext$ = getChipSetContext();

	$: role =
		$chipSetContext$.variant === "choice"
			? "radio"
			: $chipSetContext$.variant === "filter"
			? "checkbox"
			: "button";

	onMount(async () => {
		$chipSetContext$?.reinitialize();
	});
	//#endregion
</script>

<Action
	bind:dom
	{id}
	class={className}
	{style}
	{role}
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
</Action>
