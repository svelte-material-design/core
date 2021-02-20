<svelte:options immutable={true} />

<script lang="ts">
	//#region import
	import { Item } from "../../../../list/src/dom";
	import { GroupItem } from "@raythurnevoid/svelte-group-components/ts";
	import { getMenuContext } from "../../MenuContext";
	import { setItemContext } from "../../item";
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
	//#endregion
</script>

<GroupItem {dom} group={$menuContext$.menuGroup} {context}>
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
		data-value={value}
		aria-selected={selected}
		aria-disabled={disabled}
		{...$$restProps}
		let:leadingClassName
		let:trailingClassName
	>
		<slot {selected} {leadingClassName} {trailingClassName} />
	</Item>
</GroupItem>
