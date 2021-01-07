<script lang="ts" context="module">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { Ripple } from "../../ripple";
	import { getButtonBehaviour, ButtonColor, ButtonVariant } from ".";
	import { Button, A } from "../../common/dom";
	import { parseClassList } from "../../common/functions";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/button/Button:${count++}`;
	export let dom: HTMLButtonElement | HTMLAnchorElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: ButtonColor = "primary";
	export let variant: ButtonVariant = "text";
	$: variant = variant ?? "text";
	export let disabled: boolean = false;
	export let href: string = undefined;
	export let accessibleTouch: boolean = false;
	//#endregion

	//#region implementation
	const behaviour = getButtonBehaviour();
	let component: typeof Button | typeof A;
	$: component = href == null || disabled ? Button : A;
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
			[color === 'secondary', 'svmd-button--color--secondary'],
			[
				behaviour === 'card:action',
				'mdc-card__action mdc-card__action--button',
			],
			[behaviour === 'top-app-bar:action', 'mdc-top-app-bar__action-item'],
			[accessibleTouch, 'mdc-button--touch'],
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
		{#if ripple}
			<div class="mdc-button__ripple" />
		{/if}
		<slot />
		{#if accessibleTouch}
			<div class="mdc-button__touch" />
		{/if}
	</svelte:component>
</Ripple>
