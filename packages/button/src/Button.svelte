<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import type { ButtonColor, ButtonVariant } from ".";
	import { Button } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/button/Button:${count++}`;
	export let dom: HTMLButtonElement | HTMLAnchorElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: ButtonColor = "primary";
	export let variant: ButtonVariant = "text";
	export let disabled: boolean = false;
	export let href: string = undefined;
	export let accessibleTouch: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Button
	bind:dom
	{id}
	class={className}
	{variant}
	{ripple}
	{color}
	{style}
	{disabled}
	{href}
	{accessibleTouch}
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
</Button>

<style lang="scss" global>
	@use "smui-theme";
	@use "@material/button/styles";
	@use "@material/button";
	@use "@material/theme";

	.mdc-button--raised,
	.mdc-button--unelevated {
		&.svmd-button--color--secondary {
			@include button.filled-accessible(theme.$secondary);
		}
	}

	.mdc-button--text,
	.mdc-button--outlined {
		&.svmd-button--color--secondary {
			@include button.ink-color(theme.$secondary);
			@include button.outline-color(theme.$secondary);
		}
	}
</style>
