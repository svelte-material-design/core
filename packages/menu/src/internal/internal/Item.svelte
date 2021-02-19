<svelte:options immutable={true} />

<script lang="ts">
	//#region import
	import { Item } from "../../../../list/src/dom";
	import { GroupItem } from "@raythurnevoid/svelte-group-components/ts";
	import { getMenuContext } from "../../MenuContext";
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
	export let disabled: boolean = false;
	export let tabindex: number = -1;
	export let value: any = undefined;
	export let ariaLabel: string = undefined;
	export let title: string = undefined;
	//#endregion

	//#region implementation
	const menuContext$ = getMenuContext();
	//#endregion
</script>

<GroupItem group={$menuContext$.group} {dom}>
	<Item
		bind:dom
		{id}
		class={className}
		{style}
		{title}
		{tabindex}
		{selected}
		{value}
		{ariaLabel}
		{disabled}
		{ripple}
		role="menuitem"
		{...$$restProps}
		let:leadingClassName
		let:trailingClassName
	>
		<slot {selected} {leadingClassName} {trailingClassName} />
	</Item>
</GroupItem>
