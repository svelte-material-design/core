<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { getListContext } from "../..";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import type { ListImplRole } from "../types";
	import { Ripple } from "../../../../ripple";
	import type { ItemRole } from "./types";
	import { classList } from "@raythurnevoid/strings-filter";
	import { HiddenInput, ItemContent } from ".";
	import { onMount } from "svelte";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let tabindex: number = -1;
	export let value: any = undefined;
	export let ariaLabel: string = undefined;
	export let title: string = undefined;

	export let role: ItemRole = undefined;
	export let listRole: ListImplRole = undefined;
	//#endregion

	//#region implementation
	const listContext$ = getListContext();
	let useHiddenInputs: boolean = false;

	onMount(() => {
		if (
			(role === "checkbox" && !dom.querySelector("input[type=checkbox]")) ||
			(role === "radio" && !dom.querySelector("input[type=radio]"))
		) {
			useHiddenInputs = true;
		}
	});
	//#endregion
</script>

<UseState value={ripple} onUpdate={() => $listContext$.reinitialize()} />

<Ripple let:rippleClasses target={ripple ? dom : undefined}>
	<li
		bind:this={dom}
		{id}
		class={classList([
			className,
			"mdc-list-item",
			[disabled, "mdc-list-item--disabled"],
			[
				(role === "option" || role === "menuitem") && selected,
				"mdc-list-item--selected",
			],
			[role === "menuitem" && selected, "mdc-menu-item--selected"],
			rippleClasses,
		])}
		{style}
		{title}
		{tabindex}
		aria-selected={listRole === "listbox" ? selected : undefined}
		data-value={value}
		{role}
		aria-label={ariaLabel}
		aria-checked={listRole === "group" || listRole === "radiogroup"
			? `${selected}`
			: undefined}
		{...$$restProps}
	>
		{#if useHiddenInputs}
			<HiddenInput
				{selected}
				{role}
				selectionType={$listContext$.selectionType}
			/>
		{/if}
		<ItemContent {selected} let:leadingClassName let:trailingClassName>
			<slot {selected} {leadingClassName} {trailingClassName} />
		</ItemContent>
	</li>
</Ripple>
