<script lang="ts">
	//#region imports
	import { Button, A } from "../../../common/dom";
	import { Ripple } from "../../../ripple";
	import { parseClassList } from "../../../common/functions";
	import type { IconButtonDOM, IconButtonColor } from "..";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: IconButtonDOM = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: IconButtonColor = undefined;
	$: color = color ?? "inherit";
	export let href: string = undefined;
	export let disabled: boolean = false;
	// export let variant: TODO: allow support of variants, using Button underneath
	//#endregion

	//#region implementation
	let component: typeof Button | typeof A;
	$: component = href == null || disabled ? Button : A;
	//#endregion
</script>

<svelte:options immutable={true} />

<Ripple target={ripple ? dom : undefined} unbounded={true} let:rippleClasses>
	<svelte:component
		this={href ? A : Button}
		bind:dom
		{...$$restProps}
		{id}
		class={parseClassList([
			className,
			'mdc-icon-button',
			[color, `svmd-icon-button--color--${color}`],
			[ripple, rippleClasses],
		])}
		{style}
		{disabled}
		{href}
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:blur>
		<slot />
	</svelte:component>
</Ripple>
