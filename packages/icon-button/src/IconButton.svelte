<script context="module" lang="ts">
	export type IconButtonColor = "primary" | "secondary";

	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { Button, A } from "../../common/dom";
	import { getIconButtonBehaviour } from "./IconButtonContextProps";
	import { Ripple } from "../../ripple";
	import { parseClassList } from "../../common/functions";
	import { IconButtonDOM } from ".";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/button/IconButton:${count++}`;
	export let dom: IconButtonDOM = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: IconButtonColor = undefined;
	export let href: string = undefined;
	export let disabled: boolean = false;
	// export let variant: TODO: allow support of variants, using Button underneath
	//#endregion

	//#region implementation
	const behaviour = getIconButtonBehaviour();
	let component: typeof Button | typeof A;
	$: component = href == null || disabled ? Button : A;
	//#endregion
</script>

<svelte:options immutable={true} />

<Ripple
	target={ripple ? dom : undefined}
	{color}
	unbounded={true}
	let:rippleClasses>
	<svelte:component
		this={href ? A : Button}
		bind:dom
		{...$$restProps}
		{id}
		class={parseClassList([
			className,
			'mdc-icon-button',
			[behaviour === 'card:action', 'mdc-card__action mdc-card__action--icon'],
			[
				behaviour === 'top-app-bar:navigation',
				'mdc-top-app-bar__navigation-icon',
			],
			[behaviour === 'top-app-bar:action', 'mdc-top-app-bar__action-item'],
			[ripple, rippleClasses],
		])}
		{style}
		{disabled}
		{href}
		on:click>
		<slot />
	</svelte:component>
</Ripple>
