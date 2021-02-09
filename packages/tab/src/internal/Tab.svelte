<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { parseClassList } from "../../../common/functions";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let active: boolean = false;
	export let stacked: boolean = false;
	export let useMinWidth: boolean = false;
	//#endregion
</script>

<button
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([
		className,
		"mdc-tab",
		[active, "mdc-tab--active"],
		[stacked, "mdc-tab--stacked"],
		[useMinWidth, "mdc-tab--min-width"],
	])}
	{style}
	role="tab"
	aria-selected={active}
	tabindex={active ? 0 : -1}
>
	<slot />
	{#if ripple}<span class="mdc-tab__ripple" />{/if}
</button>
