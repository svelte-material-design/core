<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/drawer/nav-list/NavList:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// NavList
	import {
		NavList,
		ListOrientation,
		ListType,
	} from "../../../../packages/list";

	//#region exports
	export let orientation: ListOrientation = "vertical";
	export let type: ListType = "textual";

	export let dense: boolean = false;
	export let twoLine: boolean = false;
	export let threeLine: boolean = false;

	//#endregion
</script>

<NavList
	bind:dom
	{props}
	{id}
	class={className}
	{style}
	{orientation}
	{type}
	{dense}
	{twoLine}
	{threeLine}>
	<slot />
</NavList>
