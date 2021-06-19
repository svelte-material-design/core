<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region  imports
	import { Item } from "../../../list/src/dom/item";
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { getSelectContext } from "../SelectContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/select/Option:${count++}`;
	export let dom: HTMLLIElement = undefined;
	//#endregion

	export let value: string = "";
	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let disabled: boolean = false;
	//#endregion

	//#region implementation
	let selectedContext$ = getSelectContext();
	//#endregion
</script>

<Selectable bind:selected {value} {dom} group={$selectedContext$.group}>
	<Item
		bind:dom
		{id}
		class={className}
		{style}
		{selected}
		{disabled}
		{ripple}
		role="option"
		data-value={value}
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
		let:leadingClassName
		let:trailingClassName
	>
		<slot {selected} {leadingClassName} {trailingClassName} />
	</Item>
</Selectable>
