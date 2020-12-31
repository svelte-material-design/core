<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/item/NavItem:${count++}`;

	export let dom: HTMLAnchorElement = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Item
	//#region import
	import { createItemContext, ItemContext, getListContext } from "../";
	import { Ripple3 } from "../../../ripple";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import ItemContent from "../internal/item/ItemContent.svelte";

	//#endregion

	//#region exports
	export let ripple: boolean = true;
	export let activated: boolean = false;
	export let disabled: boolean = false;
	export let tabindex: number = -1;
	export let ariaLabel: string = undefined;
	export let title: string = undefined;

	export let href: string = undefined;
	//#endregion

	//#region locals
	let rippleClasses: string;
	const listContext$ = getListContext();
	//#endregion

	const context = ({
		disabled,
	} as any) as ItemContext;

	$: Object.assign(context, {
		disabled,
		dom,
	});
</script>

<svelte:options immutable={true} />

<UseState value={ripple} onUpdate={() => $listContext$.reinitialize()} />

<a
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-list-item',
		[disabled, 'mdc-list-item--disabled'],
		[activated, 'mdc-list-item--activated'],
		rippleClasses,
	])}
	{style}
	{href}
	{title}
	{tabindex}
	aria-label={ariaLabel}
	aria-current={activated ? 'page' : undefined}>
	<ItemContent bind:rippleClasses {ripple} itemDom={dom}>
		<slot name="leading" slot="leading" />
		<slot />
		<slot name="trailing" slot="trailing" />
	</ItemContent>
</a>
