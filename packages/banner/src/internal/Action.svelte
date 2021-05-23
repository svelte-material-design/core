<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter/ts";
	import type {
		ButtonDOM,
		ButtonColor,
		ButtonVariant,
	} from "../../../button/src/types";
	import { Button } from "../../../button/src/internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: ButtonDOM = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let color: ButtonColor = "primary";
	export let variant: ButtonVariant = "text";
	export let disabled: boolean = false;
	export let href: string = undefined;
	export let accessibleTouch: boolean = false;

	export let type: "primary" | "secondary" = "primary";
	//#endregion

	//#region implementation
	//#endregion
</script>

<Button
	bind:dom
	{id}
	class={classList([
		className,
		[type === "primary", "mdc-banner__primary-action"],
		[type === "secondary", "mdc-banner__secondary-action"],
	])}
	{style}
	{ripple}
	{color}
	{variant}
	{disabled}
	{href}
	{accessibleTouch}
	{...$$restProps}
>
	<slot />
</Button>
