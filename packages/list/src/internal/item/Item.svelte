<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { getListContext } from "../..";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import type { ItemRole } from "./types";
	import { HiddenInput } from ".";
	import { Item } from "../../dom";
	import { onMount } from "svelte";
	import { GroupItem } from "@raythurnevoid/svelte-group-components/ts";
	import type { ItemContext } from "../../item";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let value: any = undefined;
	export let role: ItemRole = undefined;

	export let context: ItemContext = undefined;
	//#endregion

	//#region implementation
	const listContext$ = getListContext();
	let useHiddenInputs: boolean = false;

	onMount(() => {
		if (
			(role === "checkbox" && !dom.querySelector("input[type=checkbox]")) ||
			(role === "radio" && !dom.querySelector("input[type=radio]")) ||
			($listContext$.role === "listbox" && role === "option")
		) {
			useHiddenInputs = true;
		}
	});
	//#endregion
</script>

<UseState
	value={$listContext$.role}
	onUpdate={() => $listContext$.reinitialize()}
/>
<UseState value={ripple} onUpdate={() => $listContext$.reinitialize()} />

<GroupItem {dom} group={$listContext$.listGroup} {context}>
	<Item
		bind:dom
		{id}
		{className}
		{style}
		{selected}
		{activated}
		{ripple}
		{disabled}
		aria-selected={$listContext$.role === "listbox" ? selected : undefined}
		data-value={value}
		{role}
		aria-checked={$listContext$.role === "group" ||
		$listContext$.role === "radiogroup"
			? `${selected}`
			: undefined}
		{...$$restProps}
		let:leadingClassName
		let:trailingClassName
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:blur
	>
		{#if useHiddenInputs}
			<!--
				This is needed because MDCList selection works only when a checkbox or a radio is present or 
				when singleSelection (in case of listbox) is true.
				So there's now way to achieve a multi-selection listbox for example.
			-->
			<HiddenInput {selected} selectionType={$listContext$.selectionType} />
		{/if}
		<slot {selected} {leadingClassName} {trailingClassName} />
	</Item>
</GroupItem>
