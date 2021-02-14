<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import type { MDCMenuDistance } from "@material/menu-surface";
	import type { MenuAnchorCorner, MenuVariant } from ".";
	import type { ListOrientation, ListItemsStyle } from "../../list";
	import { handleSelect as handleListSelect } from "../../list/src/functions";
	import { Menu, OnMenuSelect } from "./internal";
	import type {
		SelectionType,
		OnMenuChange,
		OnMenuItemSelectedEvent,
	} from "./types";
	import { onMount, createEventDispatcher, tick } from "svelte";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/menu-surface/Menu:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	//#region list
	export let orientation: ListOrientation = "vertical";
	export let itemsStyle: ListItemsStyle = "textual";
	export let itemsRows: number = 1;
	export let dense: boolean = false;
	export let wrapFocus: boolean = false;
	//#endregion

	//#region menu surface
	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorFlipRtl: boolean = true;
	export let anchorCorner: MenuAnchorCorner = "bottom-start";
	export let anchorMargin: MDCMenuDistance = undefined;
	export let variant: MenuVariant = undefined;
	export let hoisted: boolean;
	//#endregion

	export let value: string = undefined;
	export let group: SelectionGroupBinding = undefined;
	//#endregion

	//#region implementation
	let selectionType: SelectionType = "single";
	let selectionGroup: SelectionGroup;
	let anchor: HTMLElement;

	const dispatch = createEventDispatcher<{
		change: OnMenuChange;
		select: OnMenuItemSelectedEvent;
	}>();

	onMount(() => {
		anchor = dom.parentElement;
	});

	async function handleSelect({ targetIndex }: OnMenuSelect) {
		const selectedIndexes = selectionGroup
			.getItems()
			.map((item, index) => [index, item.selected] as const)
			.filter((item) => item[1])
			.map((item) => item[0]);
		handleListSelect({
			selectionType,
			selectionGroup,
			targetIndex,
			selectedIndexes,
		});

		await tick();

		dispatch("change", {
			dom,
			value,
		});
	}
	//#endregion
</script>

<SelectionGroup
	{selectionType}
	bind:this={selectionGroup}
	bind:value
	{group}
	let:group
>
	<Menu
		bind:dom
		bind:open
		bind:value
		{id}
		class={className}
		{style}
		{quickOpen}
		{anchor}
		{anchorCorner}
		{anchorFlipRtl}
		{anchorMargin}
		{variant}
		{hoisted}
		{wrapFocus}
		{orientation}
		{itemsStyle}
		{itemsRows}
		{dense}
		{selectionType}
		{group}
		{...$$restProps}
		on:select={(e) => handleSelect(e.detail)}
		on:open
		on:close
		on:closing
	>
		<slot />
	</Menu>
</SelectionGroup>
