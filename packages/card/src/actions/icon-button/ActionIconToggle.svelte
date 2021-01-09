<script lang="ts">
	//#region imports
	import { IconButtonToggle } from "../../../../icon-button-toggle/src/internal";
	import { parseClassList } from "../../../../common/functions";
	import type { IconButtonColor } from "../..";
	import { setActionType } from "../ActionsContext";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let color: IconButtonColor = undefined;
	export let ariaLabelOn: string = undefined;
	export let ariaLabelOff: string = undefined;
	//#endregion

	//#region implementation
	setActionType("icon");
	//#endregion
</script>

<svelte:options immutable={true} />

<IconButtonToggle
	bind:dom
	{...$$restProps}
	{id}
	class={parseClassList([
		className,
		'mdc-card__action',
		'mdc-card__action--icon',
	])}
	{style}
	bind:active
	{disabled}
	{color}
	{ripple}
	{ariaLabelOn}
	{ariaLabelOff}
	on:change
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur>
	<slot />
</IconButtonToggle>
