<script lang="ts" context="module">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { Ripple } from "../../../packages/ripple";
	import { getButtonBehaviour, ButtonColor, ButtonVariant } from ".";
	import { Button, A } from "../../../packages/common/dom";
	import {
		parseClassList,
		parseStylesList,
	} from "../../../packages/common/functions";
	import { themeColor } from "../../common/theme";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/button/Button:${count++}`;
	export let dom: HTMLButtonElement | HTMLAnchorElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: ButtonColor = "primary";
	export let variant: ButtonVariant = undefined;
	export let disabled: boolean = false;
	export let density: number = undefined;
	export let href: string = undefined;

	//#region theming
	export let inkColor: string = undefined;
	//#endregion
	//#endregion

	//#region implementation
	const behaviour = getButtonBehaviour();
	let component: typeof Button | typeof A;
	$: component = href == null || disabled ? Button : A;

	$: {
		// Check and fix density
		if (density > 3) density = 3;
		else if (density < 0) density = 0;
	}
	//#endregion
</script>

<svelte:options immutable={true} />

<Ripple let:rippleClasses target={ripple ? dom : undefined}>
	<svelte:component
		this={component}
		bind:dom
		{...$$restProps}
		{id}
		class={parseClassList([
			className,
			'mdc-button',
			[variant, `mdc-button--${variant}`],
			[color === 'secondary', 'smui-button--color-secondary'],
			[density != null, `smui-button--dense--${density}`],
			[
				behaviour === 'card:action',
				'mdc-card__action mdc-card__action--button',
			],
			[behaviour === 'top-app-bar:action', 'mdc-top-app-bar__action-item'],
			[ripple, rippleClasses],
		])}
		style={parseStylesList([
			[inkColor, `--smui-button--ink-color: ${themeColor(inkColor)}`],
			style,
		])}
		{disabled}
		{href}
		on:click>
		{#if ripple}<span class="mdc-button__ripple" />{/if}
		<slot />
	</svelte:component>
</Ripple>
