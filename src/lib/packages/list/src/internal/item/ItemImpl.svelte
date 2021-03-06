<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { getListContext } from "../..";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { HiddenInput } from ".";
	import { Item } from "../../dom";
	import type { ListItemElement } from "./types";
	import { onMount } from "svelte";
	import { GroupItem } from "@raythurnevoid/svelte-group-components";
	import { setItemContext } from "../../item";
	import type { ItemLines } from "../../item/types";
	import { A, Div } from "../../../../common/dom";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: ListItemElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let value: string = undefined;
	export let href: string = undefined;
	export let lines: ItemLines = undefined;
	//#endregion

	//#region implementation
	const listContext$ = getListContext();
	let useHiddenInputs: boolean = false;

	$: checked = dom && selected && (hasCheckbox() || hasRadio());

	const context$ = setItemContext({
		disabled,
		selected,
		value,
	});
	const context = $context$;
	$: $context$ = {
		...Object.assign(context, {
			...$context$,
			disabled,
			selected,
			value,
			dom,
		}),
	};

	onMount(() => {
		if ($listContext$.selectionType) {
			useHiddenInputs = true;
		}
	});

	function hasCheckbox() {
		return !!dom.querySelector("input[type=checkbox]");
	}

	function hasRadio() {
		return !!dom.querySelector("input[type=radio]");
	}
	//#endregion
</script>

<UseState value={ripple} onUpdate={() => $listContext$.reinitialize()} />

<GroupItem {dom} group={$listContext$.listGroup} {context}>
	<Item
		bind:dom
		{id}
		class={className}
		{style}
		{selected}
		{activated}
		{ripple}
		{disabled}
		{href}
		lines={lines || $listContext$.itemsRows}
		component={href ? A : Div}
		data-value={value}
		aria-selected={selected}
		aria-checked={checked}
		aria-disabled={disabled}
		{...$$restProps}
		let:leadingClassName
		let:trailingClassName
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
		{#if useHiddenInputs}
			<!--
				This is needed because MDCList selection works only when a checkbox or a radio is present or 
				when singleSelection (in case of listbox) is true.
				So there's now way to achieve a multi-selection listbox for example.
			-->
			<HiddenInput {selected} />
		{/if}
		<slot {leadingClassName} {trailingClassName} />
	</Item>
</GroupItem>
