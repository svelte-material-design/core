<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter/ts";
	import type { TypographyVariant } from ".";
	import { TypographyStyle } from ".";
	import { H1, H2, H3, H4, H5, H6, P, Span } from "../../common/dom";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLElement = undefined;
	//#endregion

	export let variant: TypographyVariant = "body1";
	export let component: any = getDefaultComponent(variant);
	//#endregion

	//#region implementation
	function getDefaultComponent(variant: TypographyVariant) {
		switch (variant) {
			case "headline1":
				return H1;
			case "headline2":
				return H2;
			case "headline3":
				return H3;
			case "headline4":
				return H4;
			case "headline5":
				return H5;
			case "headline6":
			case "subtitle1":
			case "subtitle2":
				return H6;
			case "caption":
			case "button":
			case "overline":
				return Span;
			case "body1":
			case "body2":
			default:
				return P;
		}
	}
	//#endregion
</script>

<svelte:component
	this={component}
	bind:dom
	{id}
	class={classList([className, `mdc-typography--${variant}`])}
	{style}
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
</svelte:component>

<TypographyStyle />
