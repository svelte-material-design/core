<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { getListContext } from "../..";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import type { ListImplRole } from "../types";
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
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let value: any = undefined;

	export let role: ItemRole = undefined;
	export let listRole: ListImplRole = undefined;

	export let context: ItemContext = undefined;
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

<GroupItem {dom} group={$listContext$.listGroup} {context}>
	<Item
		bind:dom
		{id}
		{className}
		{style}
		{selected}
		{ripple}
		{disabled}
		aria-selected={listRole === "listbox" ? selected : undefined}
		data-value={value}
		{role}
		aria-checked={listRole === "group" || listRole === "radiogroup"
			? `${selected}`
			: undefined}
		{...$$restProps}
		let:leadingClassName
		let:trailingClassName
		><div slot="inputHiddens">
			{#if useHiddenInputs}
				<HiddenInput
					{selected}
					{role}
					selectionType={$listContext$.selectionType}
				/>
			{/if}
		</div>
		<slot {selected} {leadingClassName} {trailingClassName} />
	</Item>
</GroupItem>
