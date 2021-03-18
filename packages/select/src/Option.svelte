<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region  imports
	import { Item } from "../../list/src/dom/item";
	import { Content } from "../../list";
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { getSelectContext } from "./SelectContext";
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
	export let selected: boolean = undefined;
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
	>
		<Content>
			<slot />
		</Content>
	</Item>
</Selectable>
