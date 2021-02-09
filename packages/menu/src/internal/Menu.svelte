<svelte:options immutable={true} />

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../common/functions";
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = undefined;
	//#endregion

	// Menu
	import type { MDCMenuDistance } from "@material/menu-surface";
	import type {
		MenuAnchorCorner,
		MenuVariant,
		OnMenuChange,
		OnMenuItemSelectedEvent,
	} from "..";
	import { MenuImpl, OnMenuImplSelect } from ".";
	import type { ListOrientation, ListItemsStyle } from "../../../list";
	import type { SelectionType } from "../../../common/hoc";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { createEventDispatcher, onMount, tick } from "svelte";

	//#region exports
	//#region list
	export let orientation: ListOrientation = "vertical";
	export let itemsStyle: ListItemsStyle = "textual";
	export let itemsRows: number = 1;

	export let dense: boolean = false;
	export let density: number = 0;
	//#endregion

	//#region menu surface
	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorFlipRtl: boolean = true;
	export let anchorCorner: MenuAnchorCorner = "bottom-start";
	$: anchorCorner = anchorCorner ? anchorCorner : "bottom-start";
	export let anchorMargin: MDCMenuDistance = undefined;
	export let variant: MenuVariant = undefined;

	export let hoisted: boolean;
	//#endregion

	//#region common
	export let wrapFocus: boolean = false;
	//#endregion

	export let disableMDCInstance: boolean = false;
	export let selectionType: SelectionType = undefined;
	export let value: any = undefined;
	export let group: SelectionGroupBinding = undefined;
	//#endregion

	const dispatch = createEventDispatcher<{
		change: OnMenuChange;
		select: OnMenuItemSelectedEvent;
	}>();

	let selectionGroup: SelectionGroup;

	let anchor: HTMLElement;
	onMount(() => {
		anchor = dom.parentElement;
	});

	async function handleSelect(event: OnMenuImplSelect) {
		dispatch("select", event);

		if (selectionType) {
			event.item.setSelected(!event.item.selected);

			await tick();

			dispatch("change", {
				dom,
				value,
			});
		}
	}
</script>

<SelectionGroup
	{selectionType}
	bind:this={selectionGroup}
	bind:value
	{group}
	let:group
>
	<MenuImpl
		bind:dom
		bind:open
		{id}
		props={{ ...props }}
		class={parseClassList([className, "mdc-menu"])}
		{style}
		{quickOpen}
		{anchor}
		{anchorCorner}
		{anchorMargin}
		{anchorFlipRtl}
		{variant}
		{wrapFocus}
		{hoisted}
		{dense}
		{density}
		{disableMDCInstance}
		{itemsRows}
		{orientation}
		{itemsStyle}
		{selectionType}
		{group}
		on:select={(event) => handleSelect(event.detail)}
		on:open
		on:close
	>
		<slot />
	</MenuImpl>
</SelectionGroup>
