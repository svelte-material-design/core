<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { Ripple } from "../../ripple";
	import type { FabColor, FabVariant } from ".";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/fab/Fab:${count++}`;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: FabColor = "secondary";
	export let show: boolean = true;
	export let variant: FabVariant = "regular";
	$: variant = variant ?? "regular";
	export let accessibleTouch: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Ripple target={ripple ? dom : undefined} let:rippleClasses>
	<button
		bind:this={dom}
		{...$$restProps}
		{id}
		class={classList([
			className,
			"mdc-fab",
			[variant === "mini", "mdc-fab--mini"],
			[variant === "extended", "mdc-fab--extended"],
			[!show, "mdc-fab--exited"],
			[color === "primary", "svmd-fab--color--primary"],
			[accessibleTouch, "mdc-fab--touch"],
			rippleClasses,
		])}
		{style}
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:blur
	>
		<span class="mdc-fab__ripple" />
		<slot />
		{#if accessibleTouch}
			<div class="mdc-fab__touch" />
		{/if}
	</button>
</Ripple>
