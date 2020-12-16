<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/Item:${count++}`;

	import { ItemRole } from ".";
	export let dom: HTMLLIElement = undefined;

	import { BaseProps } from "../../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Item
	//#region import
	import { getListContext } from "../..";
	import { UseState } from "../../../../common/hooks";
	import ItemContent from "./ItemContent.svelte";
	import { ListImplRole } from "../types";

	//#endregion

	//#region exports
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

	//#region locals
	let rippleClasses: string;
	const listContext$ = getListContext();
	//#endregion
</script>

<svelte:options immutable={true} />

<UseState value={ripple} onUpdate={() => $listContext$.reinitialize()} />

<li
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-list-item',
		[disabled, 'mdc-list-item--disabled'],
		[
			(role === 'option' || role === 'menuitem') && selected,
			'mdc-list-item--selected',
		],
		[role === 'menuitem' && selected, 'mdc-menu-item--selected'],
		rippleClasses,
	])}
	{style}
	{title}
	{tabindex}
	aria-selected={listRole === 'listbox' ? selected : undefined}
	data-value={value}
	{role}
	aria-label={ariaLabel}
	aria-checked={listRole === 'group' || listRole === 'radiogroup' ? `${selected}` : undefined}>
	<ItemContent bind:rippleClasses {selected} {ripple} itemDom={dom}>
		<slot name="leading" slot="leading" />
		<slot />
		<slot name="trailing" slot="trailing" />
	</ItemContent>
</li>
