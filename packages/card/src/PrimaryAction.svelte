<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { parseClassList } from "../../common/functions";
	import { Ripple } from "../../ripple";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Ripple target={ripple ? dom : undefined} let:rippleClasses>
	<div
		bind:this={dom}
		{id}
		class={parseClassList([
			className,
			"mdc-card__primary-action",
			rippleClasses,
		])}
		{style}
		tab-index="0"
		{...$$restProps}
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:blur
	>
		<slot />
	</div>
</Ripple>
