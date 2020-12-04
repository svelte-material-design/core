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
	import { UseState } from "../../../common/hooks";

	//#endregion

	//#region exports
	export let ripple: boolean = true;
	export let activated: boolean = false;
	export let selected: boolean = false;
	export let disabled: boolean = false;
	export let href: string = undefined;
	export let ariaLabel: string = undefined;
	export let title: string = undefined;
	//#endregion

	//#region locals
	let rippleClasses: string;
	const listContext$ = getListContext();
	//#endregion

	const context = ({
		disabled,
		selected,
	} as any) as ItemContext;

	$: Object.assign(context, {
		disabled,
		selected,
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
		[selected, 'mdc-list-item--selected'],
		rippleClasses,
	])}
	{style}
	{href}
	{title}
	aria-label={ariaLabel}
	aria-current={activated ? 'page' : undefined}>
	{#if ripple}
		<Ripple3
			bind:rippleClasses
			rippleElement={'mdc-list-item__ripple'}
			target={dom} />
	{:else}<span class="mdc-list-item__ripple" />{/if}
	<slot {selected} />
</a>
