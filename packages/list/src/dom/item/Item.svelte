<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Ripple } from "../../../../ripple";
	import type { ItemRole } from "../../internal";
	import { classList } from "@raythurnevoid/strings-filter";
	import { ItemContent } from ".";
	import { A, Div } from "../../../../common/dom";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let value: any = undefined;
	export let href: string = undefined;

	export let role: ItemRole = undefined;
	//#endregion

	//#region implementation
	let styledElement: HTMLElement;
	//#endregion
</script>

<li bind:this={dom} {id}>
	<Ripple let:rippleClasses target={ripple ? styledElement : undefined}>
		<svelte:component
			this={href === undefined ? Div : A}
			bind:dom={styledElement}
			class={classList([
				className,
				"mdc-list-item",
				[disabled, "mdc-list-item--disabled"],
				[selected, "mdc-list-item--selected"],
				[activated, "mdc-list-item--activated"],
				rippleClasses,
			])}
			{style}
			data-value={value}
			{role}
			{href}
			{...$$restProps}
			on:click
			on:mousedown
			on:mouseup
			on:keydown
			on:keyup
			on:focus
			on:focusin
			on:focusout
			on:blur
		>
			<ItemContent {selected} let:leadingClassName let:trailingClassName>
				<slot {selected} {leadingClassName} {trailingClassName} />
			</ItemContent>
		</svelte:component>
	</Ripple>
</li>
